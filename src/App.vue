<script setup lang="ts">
import { watch, ref, type Ref, onBeforeMount } from 'vue'

import Chart from 'primevue/chart'
import MultiSelect from 'primevue/multiSelect'

import { fetchQuotation, type TResponse } from './services/fetchQuotation'
import { fetchCurrenciesOptions } from './services/fetchCurrenciesOptions'

import { setChartOptions } from './utils/setchartOptions'
import { setChartData } from './utils/setChartData'
import { updateChartCurrencyData } from './utils/updateChartCurrencyData'

const currency: Ref<{ label: string; value: string }[]> = ref([])
const currencyOptions = ref()

const currencyData: Ref<TResponse> = ref({})
const chartData = ref()
const chartOptions = ref()

onBeforeMount(async () => {
	const result = await fetchCurrenciesOptions()

	const currenciesOptions: { label: string; value: string }[] = []

	result.map((currency) => {
		const formatedCurrency = currency.replace('-', '')

		currenciesOptions.push({
			label: currency,
			value: formatedCurrency
		})
	})

	currencyOptions.value = currenciesOptions
})

watch(currency, async () => {
	await getQuotation()

	currency.value.forEach((_currency) => {
		const initialValues = new Array(10)
		for (let i = 0; i < 10; i++) {
			if (initialValues[i] == undefined) {
				initialValues[i] = null
			}
		}

		const value = currencyData.value[_currency.value]

		initialValues[10] = value.high

		value.chartCurrencyData = initialValues
	})

	chartData.value = setChartData(currency.value, currencyData.value)
	chartOptions.value = setChartOptions()
})

watch(currencyData, async (newData, oldData) => {
	const old = Object.keys(oldData)
	if (!old.length) return

	currency.value.forEach((_currency) => {
		if (!oldData[_currency.value]) return

		const oldValues = oldData[_currency.value].chartCurrencyData as string[]
		const newValue = newData[_currency.value].high

		const temp: string[] = []
		oldValues.forEach((o, i) => {
			temp[i] = o
		})

		const values = updateChartCurrencyData(temp, newValue)

		newData[_currency.value].chartCurrencyData = values
	})

	chartData.value = setChartData(currency.value, newData)
})

setInterval(async () => {
	if (currency.value.length > 0) {
		await getQuotation()
	}
}, 10000)

const getQuotation = async () => {
	const currenciesToFetch = currency.value!.map((currency) => currency.label)

	const quotationResponse = await fetchQuotation(currenciesToFetch)

	currencyData!.value = quotationResponse
}
</script>

<template>
	<container>
		<section class="input-section">
			<div>
				<label for="currencies">Selecione as moedas que deseja:</label>
				<MultiSelect
					id="currencies"
					v-model="currency"
					:options="currencyOptions"
					option-label="label"
					placeholder="Moeda"
					filter
				/>
			</div>
		</section>

		<section v-if="!!currency.length" class="chat-section">
			<Chart type="line" :data="chartData" :options="chartOptions" />
		</section>
	</container>
</template>

<style lang="scss">
container {
	display: flex;
	flex-direction: column;

	gap: 20%;

	height: 100vh;
	width: 100vw;

	background: #ddd;

	.input-section {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 20vh;

		& > div {
			display: grid;
		}
	}

	.chat-section {
		padding: 0 50px;
	}
}
</style>
