//We are keeping the hardcoded results values for the study list tests
//this is intended to be running in a controled docker environment with test data.
describe('OHIF Study List', function () {
  context('Desktop resolution', function () {
    beforeEach(function () {
      cy.openStudyList();

      cy.viewport(1750, 720);
      cy.initStudyListAliasesOnDesktop();
      //Clear all text fields
      cy.get('@PatientName').clear();
      cy.get('@MRN').clear();
      cy.get('@AccessionNumber').clear();
      cy.get('@StudyDescription').clear();
    });

    it('Displays several studies initially', function () {
      cy.waitStudyList();
      cy.get('@searchResult2').should($list => {
        expect($list.length).to.be.greaterThan(1);
        expect($list).to.contain('Juno');
        expect($list).to.contain('832040');
      });
    });

    it('searches Patient Name with exact string', function () {
      cy.get('@PatientName').type('Juno');
      //Wait result list to be displayed
      cy.waitStudyList();
      cy.get('@searchResult2').should($list => {
        expect($list.length).to.be.eq(1);
        expect($list).to.contain('Juno');
      });
    });

    it('searches MRN with exact string', function () {
      cy.get('@MRN').type('0000003');
      //Wait result list to be displayed
      cy.waitStudyList();
      cy.get('@searchResult2').should($list => {
        expect($list.length).to.be.eq(1);
        expect($list).to.contain('0000003');
      });
    });

    it('searches Accession with exact string', function () {
      cy.get('@AccessionNumber').type('321');
      //Wait result list to be displayed
      cy.waitStudyList();
      cy.get('@searchResult2').should($list => {
        expect($list.length).to.be.eq(1);
        expect($list).to.contain('321');
      });
    });

    it('searches Description with exact string', function () {
      cy.get('@StudyDescription').type('PETCT');
      //Wait result list to be displayed
      cy.waitStudyList();
      cy.get('@searchResult2').should($list => {
        expect($list.length).to.be.eq(1);
        expect($list).to.contain('PETCT');
      });
    });

    /* Todo: fix react select
     it('searches Modality with camel case', function() {
       cy.get('@modalities').type('Ct');
       // Wait result list to be displayed
       cy.waitStudyList();
       cy.get('@searchResult2').should($list => {
         expect($list.length).to.be.greaterThan(1);
         expect($list).to.contain('CT');
       });
     });

    it('changes Rows per page and checks the study count', function() {
      //Show Rows per page options
      const pageRows = [25, 50, 100];

      //Check all options of Rows
      pageRows.forEach(numRows => {
        cy.get('select').select(numRows.toString()); //Select Rows per page option
        //Wait result list to be displayed
        cy.waitStudyList().then(() => {
          //Compare the search result with the Study Count on the table header
          cy.get('@numStudies')
            .should(numStudies => {
              expect(parseInt(numStudies.text())).to.be.at.most(numRows); //less than or equals to
            })
            .then(numStudies => {
              //Compare to the number of Rows in the search result
              cy.get('@searchResult2').then($searchResult => {
                let countResults = $searchResult.length;
                expect(numStudies.text()).to.be.eq(countResults.toString());
              });
            });
        });
      });
    });
    */
  });
});
