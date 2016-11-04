// This is the wrapper for custom tests, called upon web components ready state

function fireKeyboardEvent(elem, key){
  var evt = new CustomEvent('keyup',{detail:{'key':key,'keyIdentifier':key}});
   elem.dispatchEvent(evt);
}

function fireFocusEvent(elem){
  var evt = new CustomEvent('focus');
   elem.dispatchEvent(evt);
}

function runCustomTests() {

  // Place any setup steps like variable declaration and initialization here

  // This is the placeholder suite to place custom tests in
  // Use testCase(options) for a more convenient setup of the test cases
  suite('Custom Automation Tests for px-typeahead', function() {

    //this.timeout(30000);

    test('Check initial initial state of px-typeahead', function(done){
      var El = Polymer.dom(document).querySelector('px-typeahead'),
          ValueEl = Polymer.dom(El.root).querySelector('input');
      assert.equal(ValueEl.textContent, '');
      done();
    });


    test('Making sure px-typehead input will show outline when focussed', function(done){
      var typeaheadEl = Polymer.dom(this.root).querySelector('px-typeahead'),
          typeaheadInputEl = Polymer.dom(typeaheadEl.root).querySelector('input');
          assert.equal(typeaheadInputEl.textContent, '');
          typeaheadInputEl.autofocus = true;
          typeaheadInputEl.focus();
          fireFocusEvent(typeaheadInputEl);
          typeaheadInputEl.textContent = 'a';
          assert.isTrue(typeaheadEl.$$('#mainContainer').classList.contains('focus'));
          done();

    });

    test('Making sure px-typehead input type', function(done){
      var typeaheadEl = Polymer.dom(this.root).querySelector('px-typeahead'),
          typeaheadInputEl = Polymer.dom(typeaheadEl.root).querySelector('input');
          assert.equal(typeaheadInputEl.textContent, 'a');
          typeaheadInputEl.autofocus = true;
          fireFocusEvent(typeaheadInputEl);
          fireKeyboardEvent(typeaheadInputEl,'a');
          assert.equal(typeaheadInputEl.textContent,'a');
          assert.equal(typeaheadInputEl.value,'');
          done();

    });

    test('Making sure that px-typeahead shows suggestions', function(done){

          var onKeyupHandle = function(e) {
            var container = Polymer.dom(this.root).querySelector('.container');
            assert.isTrue(!container);
          };
          var typeaheadEl = Polymer.dom(document).querySelector('px-typeahead'),
              typeaheadInputEl = Polymer.dom(typeaheadEl.root).querySelector('input');
          typeaheadInputEl.autofocus = true;
          typeaheadInputEl.addEventListener('keyup', onKeyupHandle);
          fireFocusEvent(typeaheadInputEl);
          typeaheadInputEl.value = 'a';
          fireKeyboardEvent(typeaheadInputEl,'a');
          done();
          flush(() => {
              expect(document.getElementsByClassName('container').length).to.equal(1);


          });
      });

      test('Making sure based on input provided - typeahead shows 3 suggestions', function(done){

          var onKeyupHandle = function(e) {
            var container = Polymer.dom(this.root).querySelector('.container');
            assert.isTrue(!container);
          };
          var typeaheadEl = Polymer.dom(document).querySelector('px-typeahead'),
              typeaheadInputEl = Polymer.dom(typeaheadEl.root).querySelector('input');
          typeaheadInputEl.autofocus = true;
          typeaheadInputEl.addEventListener('keyup', onKeyupHandle);
          fireFocusEvent(typeaheadInputEl);
          typeaheadInputEl.value = 'a';
          fireKeyboardEvent(typeaheadInputEl,'a');
          done();
          flush(() => {
            expect(Polymer.dom(this.root).node.querySelectorAll('li').length).to.equal(3);

          });
      });
  });
};
