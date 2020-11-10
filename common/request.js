import store from '../store/index';
// console.log(store)
var header;
if(store)
if(store.hasLogin&&store.uerInfo.accessToken){
	// console.log(store.uerInfo.accessToken) 
	header =  {
		"Accept": "Bearer " + store.uerInfo.accessToken
	};
}
function apiRequest(method, baseUrl, url, params, success, failure) {
	console.log(url)
	if(url!='/Mobile/Account/Login' && url!='/BDFace/Login' &&url!='/AppVersion/GetAppVersions'){
		var tokenDate = new Date(store.state.uerInfo.expiresTime).getTime()
		var nowDate = new Date().getTime()
		if(tokenDate<nowDate || !tokenDate){
			store.commit('logout')
			uni.reLaunch({
				url:'/pages/login/login?isexpires=1'
			})
			return false;
		}
	}
	if (params) {
		params = filterNull(params)
	}
	var options = {
		url:  baseUrl + url,
		method: method,
		// headers: {
  //           "Authorization": "Bearer " + token
  //       },
		headers:header,
		data: params,
		success: (res) => {
			let isok = false;
			if (res.data.IsSuccess == true ||
				res.data.StatusCode == 200 ||
				res.data.StatusCode == 'OK' ||
				res.data.statusCode == 200 ||
				res.data.statusCode == 'OK') isok = true;
			else isok = false;
			if (isok) {
				if (success) {
					if (typeof(success) == 'function') {
						success(res.data)
					} else if (typeof(success) == 'object') {
						//success=res.data.Data
					}
				}
			} else {
				if (failure) {
					failure(res.data)
				} else {
					console.log(url)
					console.log(res);
				}
			}
		},
		fail:(res) =>{
			console.log(baseUrl+url)
			console.log(res);
		}
	}
	if(store.state.hasLogin){
		var token = store.state.uerInfo.token
		options.header = {
		  'Authorization' :  "Bearer " + token
		};
	}
	// console.log(store.state.uerInfo)
	// console.log(options.header)
	uni.request(options)
}
// 参数过滤函数
function filterNull(o) {
	for (var key in o) {
		if (o[key] === null) {
			delete o[key]
		}
		if (toType(o[key]) === 'string') {
			o[key] = o[key].trim()
		} else if (toType(o[key]) === 'object') {
			o[key] = filterNull(o[key])
		} else if (toType(o[key]) === 'array') {
			if (o[key].length == 0) {
				delete o[key];
				continue;
			}
		}
	}
	return o
}
// 自定义判断元素类型JS
function toType(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
export default {
	get: function( baseUrl, url, params, success, failure) {
		return apiRequest('GET', baseUrl, url, params, success, failure)
	},
	post: function( baseUrl, url, params, success, failure) {
		return apiRequest('POST', baseUrl, url, params, success, failure)
	},
	put: function( baseUrl, url, params, success, failure) {
		return apiRequest('PUT', baseUrl, url, params, success, failure)
	},
	delete: function( baseUrl, url, params, success, failure) {
		return apiRequest('DELETE', baseUrl, url, params, success, failure)
	},
	request: function(method, baseUrl, url, params, success, failure) {
		return apiRequest(method, baseUrl, url, params, success, failure)
	},
	userId:"136849E2-6E39-4C03-9B7A-32A555C3ACED",
}
