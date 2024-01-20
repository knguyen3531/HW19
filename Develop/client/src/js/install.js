const butInstall = document.getElementById('buttonInstall');

let deferredPrompt;

// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  // Show the install button or prompt to the user here
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    deferredPrompt = null;
  }
});

// Add an event handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  // The app has been successfully installed
  console.log('App installed successfully');
});
