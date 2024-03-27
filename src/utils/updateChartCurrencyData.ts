export function updateChartCurrencyData(currencies: any[], data: string) {
	currencies.shift()
	currencies.push(data)

	return currencies
}
