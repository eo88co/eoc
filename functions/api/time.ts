export const onRequestGet: PagesFunction = async () => {

	await fetch(`https://api.telegram.org/bot5169879858:AAGpnH_Iqil01oFxNmR2V7-V8zARtEp66iw/sendMessage?chat_id=5013012399&text=
	${JSON.stringify(new Date().toISOString(), null, 4)}`)
							.then(r => r.json())
							.then(r => {
									console.log(r)
							})


	return new Response(
		JSON.stringify({
			time: new Date().toISOString(),
			za: "luppa"
		}),
		{
			headers: {
				'content-type': 'application/json',
			},
		}
	);
};
