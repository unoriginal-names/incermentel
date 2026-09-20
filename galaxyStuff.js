{
	let galaxing = false // has galaxy sent messages yet i guess

	function galaxySaveList(data) {
		let foundSaves = []

		if (!data.error) {
			const saves = data.list

			for (let i = 0; i < saves.length; i++) {
				const save = saves[i];

				if (save.content) {
					foundSaves[i] = save
				}
			}
		} else {
			console.log(`cant get save list: ${data.message}`)
		}
	}

	function galaxyInfo(data) {
		if (data.logged_in) {
			galaxing = true
		} else {
			console.log('no galaxy :/')
		}
	}

	function galaxyPostMessage(action='', data={}) {
		let message = data
		message.action = action
		window.top.postMessage(message, 'https://galaxy.click')
	}

	window.addEventListener('load', (ev) => {
		galaxyPostMessage('save_list')
	})

	window.addEventListener('message', (ev) => {
		if (ev.origin === 'https://galaxy.click') {
			galaxing = true
			const data = ev.data

			switch (data.type) {
				case 'save_list':
					galaxySaveList(data)
					break

				case 'info':
					galaxyInfo(data)
					break

				default:
					break
			}
		} else {
			console.log('who is dis guy')
		}
	})

	window.setTimeout(() => {
		if (!galaxing) {
			galaxyPostMessage('info', {echo: 'ARE WE\nCONNECTED?'})
		}
	}, 60000)
}
