angular.module("gdlRepositories")
.factory("GondolaItemListRepository", ["$http", "baseUrl", function ($http, baseUrl) {
    var area = baseUrl + "GDL/";
    return {
        getList: function () {
            return (area + "GondolaItemList/GetList");
        },
        getData: function (data) {
            return $http.post(area + "GondolaItemList/GetData", data);
        },
        getTmpData: function (data) {
            return $http.post(area + "GondolaItemList/GetTmpData", data);
        },
        getQueryItemsDetail: function (data) {
            return $http.post(area + "GondolaItemList/GetQueryItemsDetail", data);
        },
        getQueryItemsDetailTmp: function (data) {
            return $http.post(area + "GondolaItemList/GetQueryItemsDetailTmp", data);
        },
        getItems: function (data) {
            return $http.post(area + "GondolaItemList/GetItems", data);
        },

        getTanaClassItemDetail: function (data) {
            return $http.post(area + "GondolaItemList/GetTanaClassItemDetail", { tanaClassNo: data });
        },
        getTanaClassItemDetailWidth: function (data) {
            return $http.post(area + "GondolaItemList/GetTanaClassItemDetailWidth", { tanaClassNo: data });
        },
        saveData: function (data, data2, data3) {
            
            if (data.TanaOriginal == undefined) { data.TanaOriginal = "N"; }
            else if (data.TanaOriginal == undefined) { data.TanaOriginal = "N"; }
            var dataLayer = new Array;
            var dataDetail = new Array;
            var TanaLayerSpecialdisplay;
            if (data3 == "Y") {
                TanaLayerSpecialdisplay = "Y";
            } else if (data3 == undefined) { TanaLayerSpecialdisplay = "N"; }
            else { TanaLayerSpecialdisplay = "N"; }
            for (var items in data2) {
                if (items == 0) {
                    dataLayer.push({
                        "TanaNo": data.TanaNo,
                        "TanaLayer": items,
                        "TanaLayerHoles": data2[items].holes,
                        "TanaLayerSpecialdisplay": TanaLayerSpecialdisplay,
                        "TanaLayerHookdisplay": data2[items].TanaLayerHookdisplay,
                        "TanaSdate": data.TanaSdate,
                        "TanaEdate": data.TanaEdate,
                        "DeleteFlag": "N",
                    })
                } else {
                    dataLayer.push({
                        "TanaNo": data.TanaNo,
                        "TanaLayer": items,
                        "TanaLayerHoles": data2[items].holes,
                        "TanaLayerSpecialdisplay": "N",
                        "TanaLayerHookdisplay": data2[items].TanaLayerHookdisplay,
                        "TanaSdate": data.TanaSdate,
                        "TanaEdate": data.TanaEdate,
                        "DeleteFlag": "N",
                    })
                }
                for (var item in data2[items].itemArray) {
                    if (data2[items].itemArray[item].ItemCode) {
                        dataDetail.push({
                            "TanaNo": data.TanaNo,
                            "TanaLayer": items,
                            "TanaDisplayseqno": data2[items].itemArray[item].TanaDisplayseqno,
                            "TanaNitemcode": data2[items].itemArray[item].ItemCode != undefined ? data2[items].itemArray[item].ItemCode : "",
                            "TanaNdisplaytype": data2[items].itemArray[item].tanaNdisplaytype,
                            "TanaSdate": data.TanaSdate,
                            "TanaEdate": data.TanaEdate,
                            "TanaItemflag": data2[items].itemArray[item].ItemCode != undefined ? 1 : 3,
                            "DeleteFlag": "N",
                        })
                    }
                }
            }


            return $http.post(area + "GondolaItemList/Add", { "data": data, "dataLayer": dataLayer, "dataDetail": dataDetail });
        },

        saveTempData: function (data, data2, data3) {
            if (data.TanaOriginal == undefined) { data.TanaOriginal = "N"; }
            else if (data.TanaOriginal == undefined) { data.TanaOriginal = "N"; }
            var dateNow = new Date();
            var dateMonth = dateNow.getMonth() + 1 < 10 ? "0" + (dateNow.getMonth() + 1).toString() : (dateNow.getMonth() + 1).toString();
            var dateDay = dateNow.getDate() + 1 < 10 ? "0" + dateNow.getDate().toString() : dateNow.getDate().toString();
            var tmpNo = dateNow.getFullYear().toString() + dateMonth + dateDay
                + dateNow.getHours().toString() + dateNow.getMinutes().toString() + dateNow.getSeconds().toString();
            data.TmpNo = tmpNo;
            var dataLayer = new Array;
            var dataDetail = new Array;
            var TanaLayerSpecialdisplay;
            if (data3 == "Y") {
                TanaLayerSpecialdisplay = "Y";
            } else if (data3 == undefined) { TanaLayerSpecialdisplay = "N"; }
            else { TanaLayerSpecialdisplay = "N"; }
            for (var items in data2) {
                if (items == 0) {
                    dataLayer.push({
                        "TanaNo": data.TanaNo,
                        "TanaLayer": items,
                        "TanaLayerHoles": data2[items].holes,
                        "TanaLayerSpecialdisplay": TanaLayerSpecialdisplay,
                        "TanaLayerHookdisplay": data2[items].TanaLayerHookdisplay,
                        "TmpNo": tmpNo,

                    })
                } else {
                    dataLayer.push({
                        "TanaNo": data.TanaNo,
                        "TanaLayer": items,
                        "TanaLayerHoles": data2[items].holes,
                        "TanaLayerSpecialdisplay": "N",
                        "TanaLayerHookdisplay": data2[items].TanaLayerHookdisplay,
                        "TmpNo": tmpNo,
                    })
                }
                for (var item in data2[items].itemArray) {
                    if (data2[items].itemArray[item].ItemCode) {
                        dataDetail.push({
                            "TanaNo": data.TanaNo,
                            "TanaLayer": items,
                            "TanaDisplayseqno": data2[items].itemArray[item].TanaDisplayseqno,
                            "TanaNitemcode": data2[items].itemArray[item].ItemCode != undefined ? data2[items].itemArray[item].ItemCode : "",
                            "TanaNdisplaytype": data2[items].itemArray[item].tanaNdisplaytype,
                            "TanaItemflag": data2[items].itemArray[item].ItemCode != undefined ? 1 : 3,
                            "TmpNo": tmpNo,
                        })
                    }
                }
            }


            return $http.post(area + "GondolaItemList/AddTemp", { "data": data, "dataLayer": dataLayer, "dataDetail": dataDetail });

        },

        editWithResume: function (dataTmp, data, data2, data3) {

            if (data.TanaOriginal == undefined) { data.TanaOriginal = "N"; }
            else if (data.TanaOriginal == undefined) { data.TanaOriginal = "N"; }
            var dataLayer = new Array;
            var dataDetail = new Array;
            var TanaLayerSpecialdisplay;
            if (data3 == "Y") {
                TanaLayerSpecialdisplay = "Y";
            } else if (data3 == undefined) { TanaLayerSpecialdisplay = "N"; }
            else { TanaLayerSpecialdisplay = "N"; }
            if (data.TanaEdate == "") {
                data.TanaEdate = "9999/12/31";
            }
            for (var items in data2) {
                if (items == 0) {
                    dataLayer.push({
                        "TanaNo": data.TanaNo,
                        "TanaLayer": items,
                        "TanaLayerHoles": data2[items].holes,
                        "TanaLayerSpecialdisplay": TanaLayerSpecialdisplay,
                        "TanaLayerHookdisplay": data2[items].TanaLayerHookdisplay,
                        "TanaSdate": data.TanaSdate,
                        "TanaEdate": data.TanaEdate,
                        "DeleteFlag": "N"

                    })
                } else {
                    dataLayer.push({
                        "TanaNo": data.TanaNo,
                        "TanaLayer": items,
                        "TanaLayerHoles": data2[items].holes,
                        "TanaLayerSpecialdisplay": "N",
                        "TanaLayerHookdisplay": data2[items].TanaLayerHookdisplay,
                        "TanaSdate": data.TanaSdate,
                        "TanaEdate": data.TanaEdate,
                        "DeleteFlag": "N"
                    })
                }
                for (var item in data2[items].itemArray) {
                    if (data2[items].itemArray[item].ItemCode) {
                        dataDetail.push({
                            "TanaNo": data.TanaNo,
                            "TanaLayer": items,
                            "TanaDisplayseqno": data2[items].itemArray[item].TanaDisplayseqno,
                            "TanaNitemcode": data2[items].itemArray[item].ItemCode != undefined ? data2[items].itemArray[item].ItemCode : "",
                            "TanaNdisplaytype": data2[items].itemArray[item].tanaNdisplaytype,
                            "TanaSdate": data.TanaSdate,
                            "TanaEdate": data.TanaEdate,
                            "DeleteFlag": "N"
                        })
                    }
                }
            }

            return $http.post(area + "GondolaItemList/EditEDate", { "dataTmp": dataTmp,  "data": data, "dataLayer": dataLayer, "dataDetail": dataDetail });
        },
        editData: function (data, data2, data3) {
            
            if (data.TanaOriginal == undefined) { data.TanaOriginal = "N"; }
            else if (data.TanaOriginal == undefined) { data.TanaOriginal = "N"; }
            var dataLayer = new Array;
            var dataDetail = new Array;
            var TanaLayerSpecialdisplay;
            if (data3 == "Y") {
                TanaLayerSpecialdisplay = "Y";
            } else if (data3 == undefined) { TanaLayerSpecialdisplay = "N"; }
            else { TanaLayerSpecialdisplay = "N"; }
            if (data.TanaEdate == "") {
                data.TanaEdate = "9999/12/31";
            }
            for (var items in data2) {
                if (items == 0) {
                    dataLayer.push({
                        "TanaNo": data.TanaNo,
                        "TanaLayer": items,
                        "TanaLayerHoles": data2[items].holes,
                        "TanaLayerSpecialdisplay": TanaLayerSpecialdisplay,
                        "TanaLayerHookdisplay": data2[items].TanaLayerHookdisplay,
                        "TanaSdate": data.TanaSdate,
                        "TanaEdate": data.TanaEdate,
                        "DeleteFlag": "N"

                    })
                } else {
                    dataLayer.push({
                        "TanaNo": data.TanaNo,
                        "TanaLayer": items,
                        "TanaLayerHoles": data2[items].holes,
                        "TanaLayerSpecialdisplay": "N",
                        "TanaLayerHookdisplay": data2[items].TanaLayerHookdisplay,
                        "TanaSdate": data.TanaSdate,
                        "TanaEdate": data.TanaEdate,
                        "DeleteFlag": "N"
                    })
                }
                for (var item in data2[items].itemArray) {
                    if (data2[items].itemArray[item].ItemCode) {
                        dataDetail.push({
                            "TanaNo": data.TanaNo,
                            "TanaLayer": items,
                            "TanaDisplayseqno": data2[items].itemArray[item].TanaDisplayseqno,
                            "TanaNitemcode": data2[items].itemArray[item].ItemCode != undefined ? data2[items].itemArray[item].ItemCode : "",
                            "TanaNdisplaytype": data2[items].itemArray[item].tanaNdisplaytype,
                            "TanaSdate": data.TanaSdate,
                            "TanaEdate": data.TanaEdate,
                            "DeleteFlag": "N"
                        })
                    }
                }
            }

            return $http.post(area + "GondolaItemList/Edit", { "data": data, "dataLayer": dataLayer, "dataDetail": dataDetail });
        },
        delData: function (data) {
            return $http.post(area + "GondolaItemList/Delete", data);
        },

        checkSuspend: function (data, dataTime) {
            return $http.post(area + "GondolaItemList/CheckSuspend", { itemCode: data, tanaSDate: dataTime });
        },
        checkEffect: function (data,dataTime) {
            return $http.post(area + "GondolaItemList/CheckEffect", { itemCode: data, tanaSDate: dataTime });
        },
        checkDeleteable: function (data) {
            return $http.post(area + "GondolaItemList/CheckDeleteable", data);
        },
        checkTanaNo: function (data) {
            return $http.post(area + "GondolaItemList/CheckTanaNo", { "data": data });
        },
        downloadExcel: function (data) {
            var link = "GondolaItemList/ExportExcel?";
            var where = "";
            if (data) {
                if (data.TanaNo) {
                    where += "tanaNo=" + data.TanaNo.trim();
                }
                if (data.TanaSdate) {
                    if (where.length > 0)
                        where += "&";
                    where += "tanaSdate=" + data.TanaSdate.trim();
                }
            }
            location.href = encodeURI(area + link + where);
        },
        downloadDayExcel: function (data) {
            var link = "GondolaItemList/ExportDayExcel?";
            var where = "";
            if (data) {
                if (data.TanaNo) {
                    where += "tanaNo=" + data.TanaNo.trim();
                }
            }
            location.href = encodeURI(area + link + where);
        },
    };
}]);
