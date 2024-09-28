
// 部署完成后在网址后面加上这个，获取自建节点和机场聚合节点，/?token=auto或/auto或

let mytoken = 'xyai'; //可以随便取，或者uuid生成，https://1024tools.com/uuid
let BotToken =''; //可以为空，或者@BotFather中输入/start，/newbot，并关注机器人
let ChatID =''; //可以为空，或者@userinfobot中获取，/start
let TG = 0; //小白勿动， 开发者专用，1 为推送所有的访问信息，0 为不推送订阅转换后端的访问信息与异常访问
let FileName = 'CF-Workers-SUB';
let SUBUpdateTime = 6; //自定义订阅更新时间，单位小时
let total = 99;//TB
let timestamp = 4102329600000;//2099-12-31

let cacheTTL = 24 ;//小时，缓存时长

//节点链接 + 订阅链接
let MainData = `
dm1lc3M6Ly9ldzBLSUNBaWRpSTZJQ0l5SWl3TkNpQWdJbkJ6SWpvZ0l1aUtndWVDdVRFaUxBMEtJQ0FpWVdSa0lqb2dJakl3Tmk0eU5EVXVNak0zTGpFM09TSXNEUW9nSUNKd2IzSjBJam9nSWpVMk1USTFJaXdOQ2lBZ0ltbGtJam9nSWprME0yWTFNelEyTFdFNFlUY3ROREF3T0Mxa05tTXpMVEl4TW1WbU1XTXlOamd4T0NJc0RRb2dJQ0poYVdRaU9pQWlNQ0lzRFFvZ0lDSnpZM2tpT2lBaVlYVjBieUlzRFFvZ0lDSnVaWFFpT2lBaWQzTWlMQTBLSUNBaWRIbHdaU0k2SUNKdWIyNWxJaXdOQ2lBZ0ltaHZjM1FpT2lBaUlpd05DaUFnSW5CaGRHZ2lPaUFpTHprME0yWTFNelEySWl3TkNpQWdJblJzY3lJNklDSWlMQTBLSUNBaWMyNXBJam9nSWlJc0RRb2dJQ0poYkhCdUlqb2dJaUlOQ24wPQ0Kdm1lc3M6Ly9ldzBLSUNBaWRpSTZJQ0l5SWl3TkNpQWdJbkJ6SWpvZ0l1aUtndWVDdVRJaUxBMEtJQ0FpWVdSa0lqb2dJakl3Tmk0eU5EVXVNak0zTGpFNE1pSXNEUW9nSUNKd2IzSjBJam9nSWpFeE1EWTBJaXdOQ2lBZ0ltbGtJam9nSWpReU1XTXlNelV5TFRFNU1qUXRORFJoWlMxbVpHTXhMVFUyTkdWbU16VmtNMkV5TXlJc0RRb2dJQ0poYVdRaU9pQWlNQ0lzRFFvZ0lDSnpZM2tpT2lBaVlYVjBieUlzRFFvZ0lDSnVaWFFpT2lBaWQzTWlMQTBLSUNBaWRIbHdaU0k2SUNKdWIyNWxJaXdOQ2lBZ0ltaHZjM1FpT2lBaUlpd05DaUFnSW5CaGRHZ2lPaUFpTHpReU1XTXlNelV5SWl3TkNpQWdJblJzY3lJNklDSWlMQTBLSUNBaWMyNXBJam9nSWlJc0RRb2dJQ0poYkhCdUlqb2dJaUlOQ24wPQ0Kdm1lc3M6Ly9ldzBLSUNBaWRpSTZJQ0l5SWl3TkNpQWdJbkJ6SWpvZ0l1aUtndWVDdVRNaUxBMEtJQ0FpWVdSa0lqb2dJakl3Tmk0eU5EVXVNak0zTGpFNE15SXNEUW9nSUNKd2IzSjBJam9nSWpNNU1EUTNJaXdOQ2lBZ0ltbGtJam9nSWpOak16UXhZMlJrTFRVeVltVXROR0V5TkMxaVptSm1MV1F5TWpZeE9XRTVNMlkwWWlJc0RRb2dJQ0poYVdRaU9pQWlNQ0lzRFFvZ0lDSnpZM2tpT2lBaVlYVjBieUlzRFFvZ0lDSnVaWFFpT2lBaWQzTWlMQTBLSUNBaWRIbHdaU0k2SUNKdWIyNWxJaXdOQ2lBZ0ltaHZjM1FpT2lBaUlpd05DaUFnSW5CaGRHZ2lPaUFpTHpOak16UXhZMlJrSWl3TkNpQWdJblJzY3lJNklDSWlMQTBLSUNBaWMyNXBJam9nSWlJc0RRb2dJQ0poYkhCdUlqb2dJaUlOQ24wPQ0Kdm1lc3M6Ly9ldzBLSUNBaWRpSTZJQ0l5SWl3TkNpQWdJbkJ6SWpvZ0l1aUtndWVDdVRRaUxBMEtJQ0FpWVdSa0lqb2dJakl3Tmk0eU5EVXVNak0zTGpFNE1TSXNEUW9nSUNKd2IzSjBJam9nSWpVMk5URXpJaXdOQ2lBZ0ltbGtJam9nSW1Sak5UTTNNbVl4TFdVek1UWXRORGxpTnkxak5ETmtMV1ptWm1Jd1lqYzJaakU0WVNJc0RRb2dJQ0poYVdRaU9pQWlNQ0lzRFFvZ0lDSnpZM2tpT2lBaVlYVjBieUlzRFFvZ0lDSnVaWFFpT2lBaWQzTWlMQTBLSUNBaWRIbHdaU0k2SUNKdWIyNWxJaXdOQ2lBZ0ltaHZjM1FpT2lBaUlpd05DaUFnSW5CaGRHZ2lPaUFpTDJSak5UTTNNbVl4SWl3TkNpQWdJblJzY3lJNklDSWlMQTBLSUNBaWMyNXBJam9nSWlJc0RRb2dJQ0poYkhCdUlqb2dJaUlOQ24wPQ0Kdm1lc3M6Ly9ldzBLSUNBaWRpSTZJQ0l5SWl3TkNpQWdJbkJ6SWpvZ0l1aUtndWVDdVRVaUxBMEtJQ0FpWVdSa0lqb2dJakl3Tmk0eU5EVXVNak0zTGpFNE1DSXNEUW9nSUNKd2IzSjBJam9nSWpVMU16VTRJaXdOQ2lBZ0ltbGtJam9nSWpFM1ptTmlNekkzTFRCa1pUTXRORFJpT0Mxa05EZ3lMVFU0WXpVME9HRTNaakJpTVNJc0RRb2dJQ0poYVdRaU9pQWlNQ0lzRFFvZ0lDSnpZM2tpT2lBaVlYVjBieUlzRFFvZ0lDSnVaWFFpT2lBaWQzTWlMQTBLSUNBaWRIbHdaU0k2SUNKdWIyNWxJaXdOQ2lBZ0ltaHZjM1FpT2lBaUlpd05DaUFnSW5CaGRHZ2lPaUFpTHpFM1ptTmlNekkzSWl3TkNpQWdJblJzY3lJNklDSWlMQTBLSUNBaWMyNXBJam9nSWlJc0RRb2dJQ0poYkhCdUlqb2dJaUlOQ24wPQ0Kc3M6Ly9ZV1Z6TFRJMU5pMW5ZMjA2TkhJNVIzcE1WRGg1ZVE9PUBzaGNtMy0wNjA4MDIwMS5nb3JlbGF5Lnh5ejozMjkwNiMlRTglOEElODIlRTclODIlQjk2DQpzczovL1lXVnpMVEkxTmkxblkyMDZVMnBrYVRaSVdVZHJlUT09QHNoY20xLTA2MDgwMTUwLmdvcmVsYXkueHl6OjUyNjMzIyVFOCU4QSU4MiVFNyU4MiVCOTcNCnZtZXNzOi8vZXcwS0lDQWlkaUk2SUNJeUlpd05DaUFnSW5Ceklqb2dJdWlLZ3VlQ3VUZ2lMQTBLSUNBaVlXUmtJam9nSWpJekxqRTROUzR5TURBdU9UUWlMQTBLSUNBaWNHOXlkQ0k2SUNJeE1qRTROQ0lzRFFvZ0lDSnBaQ0k2SUNJelpHWXhOR0UzWVMwd1pHSmxMVFF5Tm1VdFpHRXpOeTFpWmpoak1UZGtaVFUxWVdVaUxBMEtJQ0FpWVdsa0lqb2dJakFpTEEwS0lDQWljMk41SWpvZ0ltRjFkRzhpTEEwS0lDQWlibVYwSWpvZ0luZHpJaXdOQ2lBZ0luUjVjR1VpT2lBaWJtOXVaU0lzRFFvZ0lDSm9iM04wSWpvZ0lpSXNEUW9nSUNKd1lYUm9Jam9nSWk4elpHWXhOR0UzWVNJc0RRb2dJQ0owYkhNaU9pQWlJaXdOQ2lBZ0luTnVhU0k2SUNJaUxBMEtJQ0FpWVd4d2JpSTZJQ0lpRFFwOQ0Kc3M6Ly9ZV1Z6TFRJMU5pMW5ZMjA2VlhKcVYwOXBNVVV6VWc9PUBzaGNtMy0wNjA4MDIwMS5nb3JlbGF5Lnh5ejozMjcyMSMlRTglOEElODIlRTclODIlQjk5DQpzczovL1lXVnpMVEkxTmkxblkyMDZWa2hRVDJ4UVNteHRRdz09QHNoY20zLTA2MDgwMjAxLmdvcmVsYXkueHl6OjIyMzkyIyVFOCU4QSU4MiVFNyU4MiVCOTEwDQp2bWVzczovL2V3MEtJQ0FpZGlJNklDSXlJaXdOQ2lBZ0luQnpJam9nSXVpS2d1ZUN1VEV4SWl3TkNpQWdJbUZrWkNJNklDSXhNRGd1TVRZMUxqUXdMamsxSWl3TkNpQWdJbkJ2Y25RaU9pQWlNVFU0TURRaUxBMEtJQ0FpYVdRaU9pQWlNelZtWlRVd09HTXRZV1JtWVMwMFltSmxMV05sTURNdFptRTROVEkwT1RVMllUQXhJaXdOQ2lBZ0ltRnBaQ0k2SUNJd0lpd05DaUFnSW5OamVTSTZJQ0poZFhSdklpd05DaUFnSW01bGRDSTZJQ0ozY3lJc0RRb2dJQ0owZVhCbElqb2dJbTV2Ym1VaUxBMEtJQ0FpYUc5emRDSTZJQ0lpTEEwS0lDQWljR0YwYUNJNklDSXZNelZtWlRVd09HTWlMQTBLSUNBaWRHeHpJam9nSWlJc0RRb2dJQ0p6Ym1raU9pQWlJaXdOQ2lBZ0ltRnNjRzRpT2lBaUlnMEtmUT09DQp2bWVzczovL2V3MEtJQ0FpZGlJNklDSXlJaXdOQ2lBZ0luQnpJam9nSXVpS2d1ZUN1VEV5SWl3TkNpQWdJbUZrWkNJNklDSXpPQzQyTUM0NU1TNHlNVE1pTEEwS0lDQWljRzl5ZENJNklDSXhNakF3TlNJc0RRb2dJQ0pwWkNJNklDSmpNV015WldSbU1pMDFObVkwTFRRMU5XVXRPVEppTnkxak5UUmlaREl4TmpkaE1ESWlMQTBLSUNBaVlXbGtJam9nSWpBaUxBMEtJQ0FpYzJONUlqb2dJbUYxZEc4aUxBMEtJQ0FpYm1WMElqb2dJbmR6SWl3TkNpQWdJblI1Y0dVaU9pQWlibTl1WlNJc0RRb2dJQ0pvYjNOMElqb2dJaUlzRFFvZ0lDSndZWFJvSWpvZ0lpOWpNV015WldSbU1pSXNEUW9nSUNKMGJITWlPaUFpSWl3TkNpQWdJbk51YVNJNklDSWlMQTBLSUNBaVlXeHdiaUk2SUNJaURRcDkNCnZtZXNzOi8vZXcwS0lDQWlkaUk2SUNJeUlpd05DaUFnSW5Ceklqb2dJdWlLZ3VlQ3VURXpJaXdOQ2lBZ0ltRmtaQ0k2SUNJek9DNDJNQzQ1TVM0eU1Ea2lMQTBLSUNBaWNHOXlkQ0k2SUNJeU56UTBOeUlzRFFvZ0lDSnBaQ0k2SUNKbVkyVTBNRFU1TXkwellXUmhMVFEyTkdZdFpERTBOeTFoTkRReVpEWmxOVE5rTnpVaUxBMEtJQ0FpWVdsa0lqb2dJakFpTEEwS0lDQWljMk41SWpvZ0ltRjFkRzhpTEEwS0lDQWlibVYwSWpvZ0luZHpJaXdOQ2lBZ0luUjVjR1VpT2lBaWJtOXVaU0lzRFFvZ0lDSm9iM04wSWpvZ0lpSXNEUW9nSUNKd1lYUm9Jam9nSWk5bVkyVTBNRFU1TXlJc0RRb2dJQ0owYkhNaU9pQWlJaXdOQ2lBZ0luTnVhU0k2SUNJaUxBMEtJQ0FpWVd4d2JpSTZJQ0lpRFFwOQ0Kdm1lc3M6Ly9ldzBLSUNBaWRpSTZJQ0l5SWl3TkNpQWdJbkJ6SWpvZ0l1aUtndWVDdVRFMElpd05DaUFnSW1Ga1pDSTZJQ0l4TURRdU1qTTBMakV3TWk0eE1URWlMQTBLSUNBaWNHOXlkQ0k2SUNJeE1ESTRPQ0lzRFFvZ0lDSnBaQ0k2SUNJMU16STROR0V3TXkweU1qSXhMVFEyWVdVdFpqUTRaQzB5TlRVeU56QTVaRGhpWVdFaUxBMEtJQ0FpWVdsa0lqb2dJakFpTEEwS0lDQWljMk41SWpvZ0ltRjFkRzhpTEEwS0lDQWlibVYwSWpvZ0luZHpJaXdOQ2lBZ0luUjVjR1VpT2lBaWJtOXVaU0lzRFFvZ0lDSm9iM04wSWpvZ0lpSXNEUW9nSUNKd1lYUm9Jam9nSWk4MU16STROR0V3TXlJc0RRb2dJQ0owYkhNaU9pQWlJaXdOQ2lBZ0luTnVhU0k2SUNJaUxBMEtJQ0FpWVd4d2JpSTZJQ0lpRFFwOQ0K


`

let urls = [];
let subconverter = "SUBAPI.fxxk.dedyn.io"; //在线订阅转换后端，目前使用CM的订阅转换功能。支持自建psub 可自行搭建https://github.com/bulianglin/psub
let subconfig = "https://raw.githubusercontent.com/cmliu/ACL4SSR/main/Clash/config/ACL4SSR_Online_MultiCountry.ini"; //订阅配置文件
let subProtocol = 'https';

export default {
	async fetch (request,env) {
		const userAgentHeader = request.headers.get('User-Agent');
		const userAgent = userAgentHeader ? userAgentHeader.toLowerCase() : "null";
		const url = new URL(request.url);
		const token = url.searchParams.get('token');
		mytoken = env.TOKEN || mytoken;
		BotToken = env.TGTOKEN || BotToken;
		ChatID = env.TGID || ChatID; 
		TG =  env.TG || TG; 
		subconverter = env.SUBAPI || subconverter;
		if( subconverter.includes("http://") ){
			subconverter = subconverter.split("//")[1];
			subProtocol = 'http';
		} else {
			subconverter = subconverter.split("//")[1] || subconverter;
		}
		subconfig = env.SUBCONFIG || subconfig;
		FileName = env.SUBNAME || FileName;
		MainData = env.LINK || MainData;
		if(env.LINKSUB) urls = await ADD(env.LINKSUB);

		const currentDate = new Date();
		currentDate.setHours(0, 0, 0, 0); 
		const timeTemp = Math.ceil(currentDate.getTime() / 1000);
		const fakeToken = await MD5MD5(`${mytoken}${timeTemp}`);
		//console.log(`${fakeUserID}\n${fakeHostName}`); // 打印fakeID

		let UD = Math.floor(((timestamp - Date.now())/timestamp * total * 1099511627776 )/2);
		total = total * 1099511627776 ;
		let expire= Math.floor(timestamp / 1000) ;
		SUBUpdateTime = env.SUBUPTIME || SUBUpdateTime;

		let 重新汇总所有链接 = await ADD(MainData + '\n' + urls.join('\n'));
		let 自建节点 ="";
		let 订阅链接 ="";
		for (let x of 重新汇总所有链接) {
			if (x.toLowerCase().startsWith('http')) {
				订阅链接 += x + '\n';
			} else {
				自建节点 += x + '\n';
			}
		}
		MainData = 自建节点;
		urls = await ADD(订阅链接);

		if ( !(token == mytoken || token == fakeToken || url.pathname == ("/"+ mytoken) || url.pathname.includes("/"+ mytoken + "?")) ) {
			if ( TG == 1 && url.pathname !== "/" && url.pathname !== "/favicon.ico" ) await sendMessage(`#异常访问 ${FileName}`, request.headers.get('CF-Connecting-IP'), `UA: ${userAgent}</tg-spoiler>\n域名: ${url.hostname}\n<tg-spoiler>入口: ${url.pathname + url.search}</tg-spoiler>`);
			const envKey = env.URL302 ? 'URL302' : (env.URL ? 'URL' : null);
			if (envKey) {
				const URLs = await ADD(env[envKey]);
				const URL = URLs[Math.floor(Math.random() * URLs.length)];
				return envKey === 'URL302' ? Response.redirect(URL, 302) : fetch(new Request(URL, request));
			}
			return new Response(await nginx(), { 
				status: 200 ,
				headers: {
					'Content-Type': 'text/html; charset=UTF-8',
				},
			});
		} else {
			await sendMessage(`#获取订阅 ${FileName}`, request.headers.get('CF-Connecting-IP'), `UA: ${userAgentHeader}</tg-spoiler>\n域名: ${url.hostname}\n<tg-spoiler>入口: ${url.pathname + url.search}</tg-spoiler>`);
			let 订阅格式 = 'base64';
			if (userAgent.includes('null') || userAgent.includes('subconverter') || userAgent.includes('nekobox') || userAgent.includes(('CF-Workers-SUB').toLowerCase())){
				订阅格式 = 'base64';
			} else if (userAgent.includes('clash') || ( url.searchParams.has('clash') && !userAgent.includes('subconverter'))){
				订阅格式 = 'clash';
			} else if (userAgent.includes('sing-box') || userAgent.includes('singbox') || ( (url.searchParams.has('sb') || url.searchParams.has('singbox')) && !userAgent.includes('subconverter'))){
				订阅格式 = 'singbox';
			} else if (userAgent.includes('surge') || ( url.searchParams.has('surge') && !userAgent.includes('subconverter'))){
				订阅格式 = 'surge';
			}

			let subconverterUrl ;
			let 订阅转换URL = `${url.origin}/${await MD5MD5(fakeToken)}?token=${fakeToken}`;
			//console.log(订阅转换URL);
			let req_data = MainData;

			// 初始化缓存
			const cache = caches.default;

			let 追加UA = 'v2rayn';
			if (url.searchParams.has('clash')){
				追加UA = 'clash';
			} else if(url.searchParams.has('singbox')){
				追加UA = 'singbox';
			} else if(url.searchParams.has('surge')){
				追加UA = 'surge';
			}
			
			try {
				const responses = await Promise.all(urls.map(async url => {
					const cacheKey = new Request(url);
					
					try {
						// 设置2秒超时
						const controller = new AbortController();
						const timeoutId = setTimeout(() => controller.abort(), 2000);
	
						const response = await fetch(url, {
							method: 'get',
							headers: {
								'Accept': 'text/html,application/xhtml+xml,application/xml;',
								'User-Agent': `${追加UA} cmliu/CF-Workers-SUB ${userAgentHeader}`
							},
							signal: controller.signal
						});
	
						clearTimeout(timeoutId);
	
						if (response.ok) {
							const content = await response.text();
							
							// 请求成功，写入缓存，设置24小时的缓存时间
							const cacheResponse = new Response(content, {
								headers: {
									...response.headers,
									'Cache-Control': `public, max-age=${cacheTTL * 60 * 60}`
								}
							});
							await cache.put(cacheKey, cacheResponse);
							console.log(`更新缓存 ${url}:\n${content.slice(0, 10)}...`);
							if (content.includes('dns') && content.includes('proxies') && content.includes('proxy-groups')) {
								// Clash 配置
								订阅转换URL += "|" + url;
								return ""; // 返回空字符串，因为这种情况下我们不需要内容
							} else if (content.includes('dns') && content.includes('outbounds') && content.includes('inbounds')){
								// Singbox 配置
								订阅转换URL += "|" + url;
								return ""; // 返回空字符串，因为这种情况下我们不需要内容
							} else {
								return content;
							}
						} else {
							throw new Error('请求失败');
						}
					} catch (error) {
						// 请求失败或超时，尝试从缓存读取
						const cachedResponse = await cache.match(cacheKey);
						if (cachedResponse) {
							const cachedContent = await cachedResponse.text();
							console.log(`使用缓存内容 ${url}:\n${cachedContent.slice(0, 10)}...`);
							return cachedResponse.text();
						} else {
							console.log(`无缓存可用 ${url}`);
							return ""; // 缓存中也没有，返回空字符串
						}
					}
				}));	
			
				for (const response of responses) {
					if (response) {
						req_data += base64Decode(response) + '\n';
					}
				}
			
			} catch (error) {
				console.error('处理 URL 时发生错误：', error);
			}

			//修复中文错误
			const utf8Encoder = new TextEncoder();
			const encodedData = utf8Encoder.encode(req_data);
			const text = String.fromCharCode.apply(null, encodedData);
			
			//去重
			const uniqueLines = new Set(text.split('\n'));
			const result = [...uniqueLines].join('\n');
			//console.log(result);
			
			const base64Data = btoa(result);

			if (订阅格式 == 'base64' || token == fakeToken){
				return new Response(base64Data ,{
					headers: { 
						"content-type": "text/plain; charset=utf-8",
						"Profile-Update-Interval": `${SUBUpdateTime}`,
						"Subscription-Userinfo": `upload=${UD}; download=${UD}; total=${total}; expire=${expire}`,
					}
				});
			} else if (订阅格式 == 'clash'){
				subconverterUrl = `${subProtocol}://${subconverter}/sub?target=clash&url=${encodeURIComponent(订阅转换URL)}&insert=false&config=${encodeURIComponent(subconfig)}&emoji=true&list=false&tfo=false&scv=true&fdn=false&sort=false&new_name=true`;
			} else if (订阅格式 == 'singbox'){
				subconverterUrl = `${subProtocol}://${subconverter}/sub?target=singbox&url=${encodeURIComponent(订阅转换URL)}&insert=false&config=${encodeURIComponent(subconfig)}&emoji=true&list=false&tfo=false&scv=true&fdn=false&sort=false&new_name=true`;
			} else if (订阅格式 == 'surge'){
				subconverterUrl = `${subProtocol}://${subconverter}/sub?target=surge&url=${encodeURIComponent(订阅转换URL)}&insert=false&config=${encodeURIComponent(subconfig)}&emoji=true&list=false&tfo=false&scv=true&fdn=false&sort=false&new_name=true`;
			}
			//console.log(订阅转换URL);
			try {
				const subconverterResponse = await fetch(subconverterUrl);
				
				if (!subconverterResponse.ok) {
					return new Response(base64Data ,{
						headers: { 
							"content-type": "text/plain; charset=utf-8",
							"Profile-Update-Interval": `${SUBUpdateTime}`,
							"Subscription-Userinfo": `upload=${UD}; download=${UD}; total=${total}; expire=${expire}`,
						}
					});
					//throw new Error(`Error fetching subconverterUrl: ${subconverterResponse.status} ${subconverterResponse.statusText}`);
				}
				let subconverterContent = await subconverterResponse.text();
				if (订阅格式 == 'clash') subconverterContent =await clashFix(subconverterContent);
				return new Response(subconverterContent, {
					headers: { 
						"Content-Disposition": `attachment; filename*=utf-8''${encodeURIComponent(FileName)}; filename=${FileName}`,
						"content-type": "text/plain; charset=utf-8",
						"Profile-Update-Interval": `${SUBUpdateTime}`,
						"Subscription-Userinfo": `upload=${UD}; download=${UD}; total=${total}; expire=${expire}`,

					},
				});
			} catch (error) {
				return new Response(base64Data ,{
					headers: { 
						"content-type": "text/plain; charset=utf-8",
						"Profile-Update-Interval": `${SUBUpdateTime}`,
						"Subscription-Userinfo": `upload=${UD}; download=${UD}; total=${total}; expire=${expire}`,
					}
				});
			}
		}
	}
};

async function ADD(envadd) {
	var addtext = envadd.replace(/[	"'|\r\n]+/g, ',').replace(/,+/g, ',');  // 将空格、双引号、单引号和换行符替换为逗号
	//console.log(addtext);
	if (addtext.charAt(0) == ',') addtext = addtext.slice(1);
	if (addtext.charAt(addtext.length -1) == ',') addtext = addtext.slice(0, addtext.length - 1);
	const add = addtext.split(',');
	//console.log(add);
	return add ;
}

async function nginx() {
	const text = `
	<!DOCTYPE html>
	<html>
	<head>
	<title>Welcome to nginx!</title>
	<style>
		body {
			width: 35em;
			margin: 0 auto;
			font-family: Tahoma, Verdana, Arial, sans-serif;
		}
	</style>
	</head>
	<body>
	<h1>Welcome to nginx!</h1>
	<p>If you see this page, the nginx web server is successfully installed and
	working. Further configuration is required.</p>
	
	<p>For online documentation and support please refer to
	<a href="http://nginx.org/">nginx.org</a>.<br/>
	Commercial support is available at
	<a href="http://nginx.com/">nginx.com</a>.</p>
	
	<p><em>Thank you for using nginx.</em></p>
	</body>
	</html>
	`
	return text ;
}

async function sendMessage(type, ip, add_data = "") {
	if ( BotToken !== '' && ChatID !== ''){
		let msg = "";
		const response = await fetch(`http://ip-api.com/json/${ip}?lang=zh-CN`);
		if (response.status == 200) {
			const ipInfo = await response.json();
			msg = `${type}\nIP: ${ip}\n国家: ${ipInfo.country}\n<tg-spoiler>城市: ${ipInfo.city}\n组织: ${ipInfo.org}\nASN: ${ipInfo.as}\n${add_data}`;
		} else {
			msg = `${type}\nIP: ${ip}\n<tg-spoiler>${add_data}`;
		}
	
		let url = "https://api.telegram.org/bot"+ BotToken +"/sendMessage?chat_id=" + ChatID + "&parse_mode=HTML&text=" + encodeURIComponent(msg);
		return fetch(url, {
			method: 'get',
			headers: {
				'Accept': 'text/html,application/xhtml+xml,application/xml;',
				'Accept-Encoding': 'gzip, deflate, br',
				'User-Agent': 'Mozilla/5.0 Chrome/90.0.4430.72'
			}
		});
	}
}

function base64Decode(str) {
	const bytes = new Uint8Array(atob(str).split('').map(c => c.charCodeAt(0)));
	const decoder = new TextDecoder('utf-8');
	return decoder.decode(bytes);
}

async function MD5MD5(text) {
	const encoder = new TextEncoder();
  
	const firstPass = await crypto.subtle.digest('MD5', encoder.encode(text));
	const firstPassArray = Array.from(new Uint8Array(firstPass));
	const firstHex = firstPassArray.map(b => b.toString(16).padStart(2, '0')).join('');

	const secondPass = await crypto.subtle.digest('MD5', encoder.encode(firstHex.slice(7, 27)));
	const secondPassArray = Array.from(new Uint8Array(secondPass));
	const secondHex = secondPassArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
	return secondHex.toLowerCase();
}

function clashFix(content) {
	if(content.includes('wireguard') && !content.includes('remote-dns-resolve')){
		let lines;
		if (content.includes('\r\n')){
			lines = content.split('\r\n');
		} else {
			lines = content.split('\n');
		}
	
		let result = "";
		for (let line of lines) {
			if (line.includes('type: wireguard')) {
				const 备改内容 = `, mtu: 1280, udp: true`;
				const 正确内容 = `, mtu: 1280, remote-dns-resolve: true, udp: true`;
				result += line.replace(new RegExp(备改内容, 'g'), 正确内容) + '\n';
			} else {
				result += line + '\n';
			}
		}

		content = result;
	}
	return content;
}
