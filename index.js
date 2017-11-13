let app = new Vue({
    el: '#app',
    data: {
        namaAlternatif: ["a1", "a2", "a3"],
        c1: [4, 3, 5],
        c2: [4, 3, 4],
        c3: [5, 4, 2],
        c4: [3, 2, 2],
        c5: [3, 3, 2],
        bobotCN: [5, 3, 4, 4, 2],
    },
    methods: {
        keputusanTernormalisasi() {

            // fungsi
            ////////////////////////////-----\\\\\\\\\\\\\\\\\\\\\\\\\\\
            // fungsi untuk mencari Matriks Keputusan ternormalisasi  
            ////////////////////////////-----\\\\\\\\\\\\\\\\\\\\\\\\\\\

            // pangkat 2       
            const powC = (C) => i => math.pow(C[i], 2);

            // mencari nilai xi
            const Xi = (C) => {
                const powCi = powC(C);
                return (
                    math
                    .round(
                        math
                        .sqrt(powCi(0) + powCi(1) + powCi(2)), 4)
                )
            }

            // mencari rij
            const Rij = vx => vc => math.round(vc / vx, 4);


            // normalisasi
            const nRij = arr => {
                const vx = Xi(arr);
                const cariRij = Rij(vx);
                return arr.map(value => cariRij(value))
            }

            // F. kalikan dengan bobot
            const valXb = (val, i) => val * this.bobotCN[i];

            // c kali dengan bobot index1
            const cXb = (arr, i) => arr.map((value) => valXb(value, i));



            ////////////////////////////////////////////////////<<<<<<<


            /////////////////////////////// cari matriks normalisasi
            const cT1 = nRij(this.c1);
            const cT2 = nRij(this.c2);
            const cT3 = nRij(this.c3);
            const cT4 = nRij(this.c4);
            const cT5 = nRij(this.c5);


            /// Matriks keputusan ternormalisasi terbobot
            const cTB1 = cXb(cT1, 0);
            const cTB2 = cXb(cT2, 1);
            const cTB3 = cXb(cT3, 2);
            const cTB4 = cXb(cT4, 3);
            const cTB5 = cXb(cT5, 4);

            console.log(cTB1);


        }
    }
})