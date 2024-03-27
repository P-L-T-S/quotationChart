import type { TResponse } from '@/services/fetchQuotation'

type TCurrencies = {
	label: string
	value: string
}[]

export const setChartData = (currencies: TCurrencies, currencyData: TResponse) => {
	return {
		labels: [
			'-5m',
			'-4m:30s',
			'-4m',
			'-3m:30s',
			'-3m',
			'-2m:30',
			'-2m',
			'-1m:30s',
			'-1m',
			'-30s',
			'último'
		],
		datasets: currencies.map((_currency) => {
			const value = currencyData[_currency.value]

			return {
				label: value.code,
				data: value.chartCurrencyData,
				fill: false,
				tension: 0.4
			}
		})
	}
}
