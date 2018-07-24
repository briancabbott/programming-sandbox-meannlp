

export class NGramCalculator {

    // The N in N-Grams
    ngramLengthN: number;
    sentences: Array<string> = new Array<string>();

    constructor(ngramLengthN: number, sentences?: Array<string>) {
        this.ngramLengthN = ngramLengthN;
        if (sentences) {
            this.sentences = sentences;
        }
    }

    get getNgramLengthN(): number {
        return this.ngramLengthN;
    }

    set setNgramLengthN(ngramLengthN: number) {
        this.ngramLengthN = ngramLengthN;
    }

    get getSentences(): Array<string> {
        return this.sentences;
    }

    set setSentences(sentences: Array<string>) {
        this.sentences = sentences;
    }

    public addSentence(sentence: string) {
        if (sentence) {
            if (!this.sentences) {
                this.sentences = new Array<string>();
            }
            this.sentences.push(sentence);
        }
    }

    public calculateNGrams(): Map<string, Array<string>> {
        let map: Map<string, Array<string>> = new Map<string, Array<string>>();

        this.sentences.forEach(sentence => {
            map.set(sentence, this.calculateNGramsForSentence(sentence));
        });

        return map;
    }

    private calculateNGramsForSentence(sentence: string): Array<string> {
        let ignoredTokens: string[] = [',', '.'];
        for (var it of ignoredTokens) {
            sentence = sentence.replace(it, '');
        }

        let tokensArr: string[] = sentence.split(' ');
        
        let i: number = 0;
        let START: number = i;
        let ngramsList: Array<string> = new Array<string>();
        while (true) { // i < tokensArr.length) {
            if (i + this.ngramLengthN === tokensArr.length) {
                break;
            }

            let ngram: Array<string> = new Array<string>();
            for (var ii = START; ii < (START + this.ngramLengthN); ii++) {
                ngram.push(tokensArr[ii]);
            }
            ngramsList.push(ngram.join(' '));
        }

        return ngramsList;
    }

    public findUniqueNgrams(): Array<string> {
        let ngrams: Map<string, Array<string>> = this.calculateNGrams(); 
        let counter: Map<string, number> = new Map<string, number>();
        
        for (var value of ngrams.values()) {
            for (var val of value) {
                if (!counter.has(val)) {
                    counter.set(val, 1);
                } else {
                    counter.set(val, (<number>counter.get(val)) + 1);
                }
            }
        }

        let uniqueNgrams: Array<string> = new Array<string>();
        counter.forEach((num, val) => { 
            if (num === 1) {
                uniqueNgrams.push(val);
            }
        });
        
        return uniqueNgrams; 
    }

    public findCommonNGrams(): Array<string> {
        let ngrams: Map<string, Array<string>> = this.calculateNGrams(); 

        return new Array();
    }
}