export const onRequestGet: PagesFunction = async () => {
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
