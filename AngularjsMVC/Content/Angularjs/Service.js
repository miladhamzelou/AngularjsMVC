InterestApp123.service("myService", function ($http) {
    this.getList = function (data) {
        return $http.post('/UnityDemo/GetList',data);
    }
    this.add = function (data) {
        return $http.post('/UnityDemo/Add', data);
    }
    this.update = function (data) {
        return $http.post('/UnityDemo/Update', data);
    }
    this.delete = function (data) {
        return $http.post('/UnityDemo/Delete', data);
    }
});