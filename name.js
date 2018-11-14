var name = "Remembrall";
var h = document.getElementById('heading');
colors = ['black', 'red', 'darkgreen', 'purple', 'darkblue', 'yellow'];

for (var i = 0; i < name.length; i++) {
  color = colors[Math.floor(Math.random() * 6)];
  h.innerHTML += "<span style=\"color:" + color + "\">" + name[i] + "</span>";
}