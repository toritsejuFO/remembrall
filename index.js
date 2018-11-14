const rand_id = Math.random().toString(36).slice(2, 13) // Generate random id

player = {
  name: localStorage.getItem('remembrall_name') || 'anonymous', // Get name
  id: localStorage.getItem('remembrall_id') || localStorage.setItem('remembrall_id', rand_id), // Get id or set for first time
  setName: function (name) {
    localStorage.setItem('remembrall_name', name);
    this.name = name || 'anonymous';
  }
}

player.id = player.id ? player.id : localStorage.getItem('remembrall_id'); // Then get id

console.log(player)

// Get and show player name if it exists
input = document.getElementById('name');
if (player.name != 'anonymous') {
  input.value = player.name;
}

playButton = document.getElementById('play')
playButton.addEventListener('click', setNameAndSubmit)

// Set name if new player or player changes name
function setNameAndSubmit() {
  if (player.name == 'anonymous' || player.name != input.name) {
    player.setName(input.value)
  }

  const options = {
    url: 'http://167.99.7.142:5000/users',
    data: {
      method: 'POST',
      body: JSON.stringify(player),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      }
    }
  }

  fetch(options.url, options.data)
    .then(res => res.json())
    .then(json => {
      console.log(json)
      window.location = 'main.html'
    })
    .catch(err => {
      console.error('Error' + err)
      window.location = 'main.html'
    })
}