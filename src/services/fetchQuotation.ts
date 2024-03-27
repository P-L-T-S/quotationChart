export interface ICurrencyInfo {
	code: string
	codein: string
	name: string
	high: string
	low: string
	varBid: string
	pctChange: string
	bid: string
	ask: string
	timestamp: string
	create_date: string
	chartCurrencyData?: string[]
}

export type TResponse = {
	[key: string]: ICurrencyInfo
}

export async function fetchQuotation(currency: string[]) {
	const joined = currency.join()

	const urlQuotation = `https://economia.awesomeapi.com.br/json/last/${joined}`

	const response = await fetch(urlQuotation)

	const result: TResponse = await response.json()

	return result
}
