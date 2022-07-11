// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)] 
  } 
  
  // Returns random ID number
  const returnRandID = () => {
    return Math.floor(Math.random() * 100)
  } 
  // Returns a random single strand of DNA containing 15 bases
  const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase())
    }
    return newStrand
  }
  
  // factory function simulating pAequor DNA creation and mutations/compare/survivability methods
  const pAequorFactory = (numSpecies, dna) => {
    return ({
      numSpecies,
      dna,
  // method to randomly select a base and change it with another random base
      mutate() {
        const rBase = this.dna[Math.floor(Math.random() * 15)];
        const index = this.dna.indexOf(rBase);
        let mBase = returnRandBase();
  console.log(`- Index of base is [${index}] -`);
  console.log(`- The base to be mutated is [${rBase}] -`);
  console.log(`- The original base has been mutated to [${mBase}] - \n`);
  console.log(`- In the event the original base and mutated base are identical, the program will run until they are always different. - \n`);
          while (this.dna[index] === mBase) {
            mBase = returnRandBase();
          }   
          this.dna[index] = mBase;  
          return this.dna;
      },
  // method to compare DNA strands and return the percentage in common
      compareDNA(obj) { 
        const arr1 = this.dna;
        const arr2 = obj.dna;
        const results = [];
        arr1.forEach((elem, i) => {
          if (elem && arr2[i] && elem === arr2[i]) {
            results.push(arr2[i])
          }
        })
        const percent = Math.floor((results.length / arr2.length) * 100);
        return `Sample: ${this.numSpecies} and Sample: ${obj.numSpecies} have ${percent}% DNA in common`;
      },
  // method to predict survivability amongst test strands
      willLikelySurvive() {
        const arr1 = this.dna;
        const results = [];
        const letter1 = 'C';
        const letter2 = 'G';
        arr1.filter(base => {
          if (base === letter1 || base === letter2) {
            results.push(base);
          }
        })
        const percent = Math.floor((results.length / arr1.length) * 100);
        console.log(`Sample ${this.numSpecies} has ${percent}% of 'C' and 'G' bases.`);
        return percent >= 60;
      }
    })
  };
  // create array of test strands with likely survivability in natural habitat
  const viableTestSpecies = () => {
    const viableResults = [];
    while (viableResults.length < 30) {
      let test = pAequorFactory(returnRandID(), mockUpStrand())
      if (test.willLikelySurvive()) {
        viableResults.push(test);
      }
    } return viableResults;
  }; 
  
  
  // test cases
  
  const newSpecimen1 = pAequorFactory(returnRandID(), mockUpStrand());
  console.log(newSpecimen1);
  console.log(newSpecimen1.mutate());
  
  const newSpecimen2 = pAequorFactory(returnRandID(), mockUpStrand());
  console.log(newSpecimen2);
  
  console.log(newSpecimen1.compareDNA(newSpecimen2));
  
  console.log(newSpecimen1.willLikelySurvive());
  
  const viableTestResults = viableTestSpecies(newSpecimen1);
  console.log(viableTestResults);
  console.log(viableTestResults.length);