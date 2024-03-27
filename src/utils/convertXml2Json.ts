export function convertXml2Json(xml: XMLDocument) {
	const child = xml.documentElement.childNodes
	const currencies: string[] = []

	child.forEach((child) => {
		currencies.push(child.nodeName)
	})

	return currencies
}
