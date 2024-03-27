export const setChartOptions = () => {
	const documentStyle = getComputedStyle(document.documentElement)
	const textColor = documentStyle.getPropertyValue('--text-color')
	const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary')
	const surfaceBorder = documentStyle.getPropertyValue('--surface-border')

	return {
		maintainAspectRatio: false,
		aspectRatio: 0.6,
		plugins: {
			legend: {
				labels: {
					color: textColor
				}
			}
		},
		scales: {
			x: {
				ticks: {
					color: textColorSecondary
				},
				grid: {
					color: surfaceBorder
				}
			},
			y: {
				ticks: {
					color: textColorSecondary
				},
				grid: {
					color: surfaceBorder
				}
			}
		}
	}
}
