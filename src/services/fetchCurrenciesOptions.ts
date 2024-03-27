import { convertXml2Json } from '@/utils/convertXml2Json'

export async function fetchCurrenciesOptions() {
	const url = 'https://economia.awesomeapi.com.br/xml/available'

	const response = await fetch(url)
	const result = await response.text()

	const parser = new DOMParser()

	const xml = parser.parseFromString(result, 'text/xml')

	return convertXml2Json(xml)
}
