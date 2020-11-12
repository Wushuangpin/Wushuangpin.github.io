var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
var PI = 3.1415926535897932384626;
var a = 6378245.0;
var ee = 0.00669342162296594323;
	/* 打开地图='gcj02' */
	function openMap(latitude, longitude, name, coord_type) {
		// console.log(name)
		let arr = getCoordByType(longitude, latitude, coord_type)
		// #ifdef APP-PLUS
		let u = navigator.userAgent;
		let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
		let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		if (isAndroid) {
					console.log('运行Android上')
					openMapByAndroid(arr[1], arr[0], name)
					// openMapByAndroid(latitude, longitude, name)
		} else if (isIOS) {
					console.log('运行iOS上')
					openMapByIos(arr[1], arr[0], name)
		}else{
					openMapByDefault(arr[1], arr[0], name)
					console.log('运行在开发者工具上')
		}
		// switch(uni.getSystemInfoSync().platform){
		// 	case 'android':
		// 		console.log('运行Android上')
				// openMapByAndroid(arr[1], arr[0], name)
				openMapByAndroid(latitude, longitude, name)
		// 		break;
		// 	case 'ios':
		// 		console.log('运行iOS上')
		// 		openMapByIos(arr[1], arr[0], name)
		// 		break;
		// 	default:
		// 		openMapByDefault(arr[1], arr[0], name)
		// 		console.log('运行在开发者工具上')	
		// 		break;
		// }	
		// // #endif
		// // #ifndef APP-PLUS
		// openMapByDefault(arr[1], arr[0], name)
		// #endif
	}

	function openMapByDefault(latitude, longitude, name) {
		uni.openLocation({
			latitude: latitude,
			longitude: longitude,
			name: name,
			fail: () => {
				uni.showModal({
					content: '打开地图失败,请检查重试'
				})
			},
		})
	}
	function openMapByAndroid(latitude, longitude, name) {
		let url = ''; // 回调地址
		let identity = ''; // 程序名称
		if(plus.runtime.isApplicationExist({pname: 'com.baidu.BaiduMap'})) { // baidumap
			url = `baidumap://map/marker?location=${latitude},${longitude}&title=${name}&coord_type=gcj02&src=andr.baidu.openAPIdemo`
			identity = 'com.baidu.BaiduMap'
			openURL(url, identity)
		}
		else if(plus.runtime.isApplicationExist({pname: 'com.autonavi.minimap'})) { // 高德
			url = `androidamap://viewMap?sourceApplication=appname&poiname=${name}&lat=${latitude}&lon=${longitude}&dev=0`
			identity = 'com.autonavi.minimap'
			openURL(url, identity)
		}
		else {
			openMapByDefault(latitude, longitude, name)
		}
	}
	function openMapByIos(latitude, longitude, name) {
		let url = ''; // 回调地址
		let errorCB = ''; // url失败的回调地址
		let identity = ''; // 程序名称
	
		if(plus.runtime.isApplicationExist({action: 'baidumap://'})) { // baidumap
			url = `baidumap://map/marker?location=${latitude},${longitude}&title=${name}&content=${name}&src=ios.baidu.openAPIdemo&coord_type=gcj02`;
			openURL(url, identity)
		}
		else if(plus.runtime.isApplicationExist({action: 'iosamap://'})) { // 高德
			url = `iosamap://viewMap?sourceApplication=applicationName&poiname=${name}&lat=${latitude}&lon=${longitude}&dev=0`
			openURL(url, identity)
		} 
		else {
			openMapByDefault(latitude, longitude, name)
		}
	}
	function openURL(url, identity ) {
		let newurl = encodeURI(url);
		plus.runtime.openURL( newurl, function(res){
			uni.showModal({
				content: res.message
			})
		}, identity);
	}
	function getCoordByType(longitude, latitude, coord_type) {
		switch (coord_type){
			case 'gcj02':
				return [longitude, latitude]
				break;
			case 'bd09':
				return TransformCoordinate.bd09togcj02(longitude, latitude)
				break;
			case 'wgs84':
				return wgs84togcj02(longitude, latitude)
				break;
			default:
				return [longitude, latitude]
				break;
		}
	
	}
	function wgs84togcj02(lng, lat) {
	    if (out_of_china(lng, lat)) {
	        return [lng, lat]
	    }
	    else {
	        var dlat = transformlat(lng - 105.0, lat - 35.0);
	        var dlng = transformlng(lng - 105.0, lat - 35.0);
	        var radlat = lat / 180.0 * PI;
	        var magic = Math.sin(radlat);
	        magic = 1 - ee * magic * magic;
	        var sqrtmagic = Math.sqrt(magic);
	        dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
	        dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
	        var mglat = lat + dlat;
	        var mglng = lng + dlng;
	        return [mglng, mglat]
	    }
	}
	function out_of_china(lng, lat) {
	    return (lng < 72.004 || lng > 137.8347) || ((lat < 0.8293 || lat > 55.8271) || false);
	}
	function transformlat(lng, lat) {
	    var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
	    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
	    ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
	    ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
	    return ret
	}
	 
	function transformlng(lng, lat) {
	    var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
	    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
	    ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
	    ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
	    return ret
	}