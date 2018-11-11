var app = new Vue({
    el: '#app',
    data: {
      message: 'Ein kleiner Übersetzungsdienst',
      inputText: 'zu übersetzender Text',
      inputLang: 'EN',
      newText: ''
    },
    methods: {
      onButtonClick: function() {
        var translateText = firebase.functions().httpsCallable("translateText");
        translateText({text: this.inputText, lang: this.inputLang}).then(function(result) {
            app.newText = result.data.translatedText;
        })
      }
    }
  })