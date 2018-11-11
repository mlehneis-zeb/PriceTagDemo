var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
      inputText: 'zu übersetzender Text',
      inputLang: 'EN',
      newText: ''
    },
    methods: {
      onButtonClick: function() {
        var translateText = firebase.functions().httpsCallable("translateText");
        translateText({text: this.inputText, lang: this.inputLang}).then(function(result) {
            app.newText = "Hello " + result.data.translatedText;
        })
      }
    }
  })