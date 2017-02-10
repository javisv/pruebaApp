		phonon.options({
			navigator: {
				defaultPage: 'home',
				animatePages: true,
				enableBrowserBackButton: true,
				templateRootDirectory: './tpl'
			},
			i18n: null // for this example, we do not use internationalization
		});


		var realApp = phonon.navigator();
		realApp.on({page: 'home', preventClose: false, content: null});
		realApp.on({page: 'pagetwo', preventClose: true, content: 'pagetwo.html', readyDelay: 1}, function(activity) {
			var action = null;

			var onAction = function(evt) {
				var target = evt.target;
				action = 'ok';
				
				if(target.getAttribute('data-order') === 'order') {
					phonon.alert('Thank you for your order!', 'Dear customer');

				} else {
					phonon.alert('Your order has been canceled.', 'Dear customer');
				}
			};

			activity.onCreate(function() {
				document.querySelector('.order').on('tap', onAction);
				document.querySelector('.cancel').on('tap', onAction);
			});

			activity.onClose(function(self) {
				if(action !== null) {
					self.close();
				} else {
					phonon.alert('Before leaving this page, you must perform an action.', 'Action required');
				}
			});

			activity.onHidden(function() {
				action = null;
			});

			activity.onHashChanged(function(pizza) {
				document.querySelector('.pizza').textContent = pizza;
			});
		});


document.addEventListener('deviceready', function(){
	realApp.start();
}, false);
