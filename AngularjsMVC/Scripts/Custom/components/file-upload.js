(function () {
    angular
        .module("directives")
        .directive("fileUpload", fileUploadDirective);

        var paramsModel = function () {
            return {
                isDisable: false,
                isRequired : false,
                isShow: {
                    fileName : false,
                    Img : false
                },
                Img: {
                    src: null,
                    hasBackImg: false,
                    isBase64Img : false,
                    style: {
                        width: 250,
                        maxWidth: null,
                        height: 250,
                        maxHeight: null
                    }
                },
                clearCallback: function () { }
            }
        };
        var assignFileToModel = function (ngModel, files) {
            if (files) {
                ngModel.$setViewValue(files);
            } else {
                ngModel.$setViewValue(null);
            }
            ngModel.$render();
        };

        var generateInputElement = function (scope, baseElement) {
            var currentId = scope.$index == undefined || scope.$index == null ? scope.$id : scope.$index;
            var baseTemplate = '<input type="file" id="uplFiles' + currentId + '"'
                                + 'ng-disabled="params.isDisable"'
                                + 'ng-required="params.isRequired"'
                                + 'style="width: 0.1px;height: 0.1px;opacity: 0;overflow: hidden;position: absolute;z-index: -1;" multiple/>'
                                + '<label for="uplFiles' + currentId + '" class="btn">選取檔案</label>';
            var fileElement = angular.element(baseTemplate);
            baseElement.append(fileElement);
            return fileElement;
        };

        var generateClearButton = function (scope, baseElement) {
            //TODO click event , disable
            var baseTemplate = "<button class='btn' ><span class='btn-icon btn-icon-delete' "
                                + "ng-disabled='params.isDisable' "
                                + "ng-click='parms.clearCallback'"
                                + "></span>清除</button>";
            var clearElement = angular.element(baseTemplate);
            clearElement.on('click', scope.params.clearCallback);
            baseElement.append(clearElement);
            return clearElement;
        };

        var generateFileName = function (scope, baseElement, fileName) {
            if (scope.params.isShow.fileName) {
                fileName = fileName == undefined || fileName == null || fileName == '' ? "未選擇任何檔案" : fileName;
                var baseTemplate = "<label class='text-info'>" + fileName + "</label>";
                var fileNameElement = angular.element(baseTemplate);
                //baseElement.append(fileNameElement);
                return fileNameElement;
            }
        };

        var generateImg = function (scope, baseElement) {
            if (scope.params.isShow.Img) {
                var baseTemplate = scope.params.Img.hasBackImg ? '<div>' : "<img src='scope.params.Img.src'>";
                var imgElement = angular.element(baseTemplate);
                
                if (scope.params.Img.hasBackImg) {
                    imgElement.css({
                        'background-image': 'url(' + (scope.params.Img.src || '') + ')',
                        'background-size': 'cover',
                        'width': scope.params.Img.style.width + 'px',
                        'height': scope.params.Img.style.height + 'px',
                        'color': '#DDDDDD',
                        'text-align': 'center',
                        'font-size': '18px'
                    });
                } else {
                    imgElement.css({
                        'max-width': scope.params.Img.style.maxWidth + 'px'
                    });
                }

                baseElement.append(imgElement);
                return imgElement;
            }
        };

        // There are bugs in here.
        var getFileContext = function ($q, scope, file) {
            if (scope.params.Img.isBase64Img) {
                $.all(readFile($q,file)).then(function (fileContent) {
                    scope.params.Img.src = fileContent;
                });
            } else {
                scope.$watch("ngModel", function (newVal) {
                    scope.params.Img.src = newVal;
                });
            }
        };

        var readFile = function ($q, file) {
            var deferred = $q.defer();
            var reader = new FileReader()
            reader.onload = function (e) {
                deferred.resolve(e.target.result);
            }
            reader.onerror = function (e) {
                deferred.reject(e);
            }
            reader.readAsDataURL(file);
            return deferred.promise;
        };

        function merge_options(incomeOpt, defaultOpt) {
            if (incomeOpt == undefined){
                return defaultOpt;
            }

            for (var p in defaultOpt) {
                try {
                    var currentIncomeOptValue = (incomeOpt[p] == undefined) ? defaultOpt[p] : incomeOpt[p];
                    defaultOpt[p] = (defaultOpt[p].constructor == Object) ? merge_options(currentIncomeOptValue, defaultOpt[p]) : currentIncomeOptValue;
                } catch (e) {
                    defaultOpt[p] = (incomeOpt[p] == undefined) ? defaultOpt[p] : incomeOpt[p];
                }
            }
            return defaultOpt;
            
        }

        var _fileUpload = function () {
            this.fileNameElement = generateFileName()

        };
        function fileUploadDirective($q) {
            return {
                restrict: 'AE',
                require: 'ngModel'  ,
                scope: {
                    params : '='
                },
                link: function (scope, baseElement, attrs, ngModel) {
                    var defaultParams = new paramsModel();
                    //scope.params = merge_options(scope.params, defaultParams);
                    
                    var fileElement = generateInputElement(scope, baseElement);
                    fileElement.on('change', function (e) {
                        var currentElement = e.target;
                        var _files = currentElement.files;
                        assignFileToModel(ngModel, _files);
                        //for (var fileIndex = 0; fileIndex < _files.length; fileIndex++)
                        //{
                        //    var currentFile = _files[fileIndex];
                        //    generateFileName(scope, baseElement, currentFile.name);
                        //    generateClearButton(scope,baseElement);
                        //    getFileContext($q, scope, currentFile);
                        //    generateImg(scope, baseElement);
                        //}
                    });
                }
            }
        };
})();