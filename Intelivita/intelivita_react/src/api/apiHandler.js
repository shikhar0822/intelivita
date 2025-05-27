import { axiosClient } from "./apiClient";

export function getLeaderboard(data){
    if(data.search != undefined){
        return axiosClient.get(`api/leaderboard/get-leaderboard?search=${data.search}`, data);
    }
    else {
        return axiosClient.get(`api/leaderboard/get-leaderboard`, data);
    }
}

export function getCalculate(data){
    console.log('data: ', data);
    if(data.filter != ""){
        return axiosClient.post(`api/leaderboard/recalculate?filter=${data.filter}`, data);
    }
    else{
        return axiosClient.post('api/leaderboard/recalculate', data);
    }
}