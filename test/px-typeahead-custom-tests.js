// This is the wrapper for custom tests, called upon web components ready state

function fireKeyboardEvent(elem, key){
  var evt = new CustomEvent('keyup',{detail:{'key':key,'keyIdentifier':key}});
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
    

    test('Making sure of px-typehead input will show outline when focussed', function(done){
      var typeaheadEl = Polymer.dom(this.root).querySelector('px-typeahead'),
          typeaheadInputEl = Polymer.dom(typeaheadEl.root).querySelector('input');
          assert.equal(typeaheadInputEl.textContent, '');
          typeaheadInputEl.autofocus = true;
          typeaheadInputEl.focus();
          document.getElementsByTagName('input').value='a';
          var node = Polymer.dom(this.root).node.querySelectorAll('.parentdiv');
          var classList = node[0].classList;
          assert.include(classList.value,'focus');
          done();
          
    });

    test('Making sure of px-typehead input type', function(done){
      var typeaheadEl = Polymer.dom(this.root).querySelector('px-typeahead'),
          typeaheadInputEl = Polymer.dom(typeaheadEl.root).querySelector('input');
          assert.equal(typeaheadInputEl.textContent, '');
          typeaheadInputEl.autofocus = true;
          typeaheadInputEl.focus();
          document.getElementsByTagName('input').value='a';
          fireKeyboardEvent(typeaheadInputEl,'a');
          assert.equal(typeaheadInputEl.value,'');
          done();
          
    });

    test('Making sure that px-typeahead shows suggestions', function(done){
      
          var onKeyupHandle = function(e) {
            var container = Polymer.dom(this.root).querySelector('.container');
            document.body.style.background = "aqua";
            assert.isTrue(!container);  
          };
          var typeaheadEl = Polymer.dom(document).querySelector('px-typeahead'),
              typeaheadInputEl = Polymer.dom(typeaheadEl.root).querySelector('input');
          typeaheadInputEl.autofocus = true;
          typeaheadInputEl.addEventListener('keyup', onKeyupHandle);
          typeaheadInputEl.focus();
          typeaheadInputEl.value = 'a';
          fireKeyboardEvent(typeaheadInputEl,'a');
          done();
          flush(() => {
              var container = Polymer.dom(this.root).node.querySelector('.container');
              expect(container).to.have.property('style');
              expect(document.getElementsByClassName('container').length).to.equal(1);
              
    
          });
      });

      test('Making sure based on input provided - typeahead shows 3 suggestions', function(done){
      
          var onKeyupHandle = function(e) {
            var container = Polymer.dom(this.root).querySelector('.container');
            document.body.style.background = "aqua";
            assert.isTrue(!container);  
          };
          var typeaheadEl = Polymer.dom(document).querySelector('px-typeahead'),
              typeaheadInputEl = Polymer.dom(typeaheadEl.root).querySelector('input');
          typeaheadInputEl.autofocus = true;
          typeaheadInputEl.addEventListener('keyup', onKeyupHandle);
          typeaheadInputEl.focus();
          typeaheadInputEl.value = 'a';
          fireKeyboardEvent(typeaheadInputEl,'a');
          done();
          flush(() => {
            expect(Polymer.dom(this.root).node.querySelectorAll('li').length).to.equal(3);
    
          });
      });
  });
};
