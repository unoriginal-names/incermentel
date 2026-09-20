{
	let last = Date.now()

	let player = {
		energy: 0,
		energyCap: 50,

		playtime: 0,
	}

	function buttonClick(auto=false) {
		player.energy = Math.min(player.energy + 1, player.energyCap)
	}

	function format(x=0) {
		if (Math.abs(x) >= 1e+5) {
			m = Math.floor(x / 10 ** Math.floor(Math.log10(x)) * 1e+3) / 1e+3
			e = Math.abs(Math.floor(Math.log10(x)))

			return `${m}e${e}`
		} else {
			m = Math.floor(x * 1e+3) / 1e+3

			return `${m}`
		}
	}

	window.setInterval(() => {
		let delta = Date.now() - last
		last = Date.now()

		player.playtime += delta
		player.energy *= 0.85 ** (delta / 1000)

		// main tab
		const mainTab = document.getElementById('tab-main')
		mainTab.children[0].innerHTML = `you have ${format(player.energy)}/${format(player.energyCap)} energy.`
	}, 20)
}
