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
        isJawaban: false,
        solusinya: []
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

            // c kali dengan bobot index
            const cXb = (arr, i) => arr.map((value) => valXb(value, i));

            // minum dari array
            const minArr = arr => math.min(...arr);


            // maksimum dari array
            const maxArr = arr => math.max(...arr);

            // F. Jarak
            const jarak = (nilaiTerbobot, solusi) => {
                const dikurangi = nilaiTerbobot.map((nilai, i) => {
                    return (nilai - solusi[i])
                });
                const dipow2 = dikurangi.map(nilai => math.pow(nilai, 2));

                const dijumlahkan = dipow2.reduce((a, b) => a + b, 0);

                return math.round(
                    math.sqrt(dijumlahkan),
                    4
                );
            }

            // F.solusi
            const solusi = (positif, negatif) => {
                return math.round((negatif / (positif + negatif )), 4);
            }



            ////////////////////////////////////////////////////<<<<<<<
            //////////////////////////cari jawabanya\\\\\\\\\\\\\\\\\\\\\
            ////////////////////////////////////////////////////////////


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

            // solusi ideal positif
            const maxCTB1 = maxArr(cTB1);
            const maxCTB2 = maxArr(cTB2);
            const maxCTB3 = maxArr(cTB3);
            const maxCTB4 = maxArr(cTB4);
            const maxCTB5 = maxArr(cTB5);

            const maxCTB = [maxCTB1, maxCTB2, maxCTB3, maxCTB4, maxCTB5];


            // solusi ideal negatif
            const minCTB1 = minArr(cTB1);
            const minCTB2 = minArr(cTB2);
            const minCTB3 = minArr(cTB3);
            const minCTB4 = minArr(cTB4);
            const minCTB5 = minArr(cTB5);

            const minCTB = [minCTB1, minCTB2, minCTB3, minCTB4, minCTB5]


            // masukan bobot niali CTB  ke tiap nama alternatif
            const a1 = {
                name: this.namaAlternatif[0],
                value: [
                    cTB1[0],
                    cTB2[0],
                    cTB3[0],
                    cTB4[0],
                    cTB5[0]
                ],
            }

            const a2 = {
                name: this.namaAlternatif[1],
                value: [
                    cTB1[1],
                    cTB2[1],
                    cTB3[1],
                    cTB4[1],
                    cTB5[1]
                ]
            }

            
            const a3 = {
                name: this.namaAlternatif[2],
                value: [
                    cTB1[2],
                    cTB2[2],
                    cTB3[2],
                    cTB4[2],
                    cTB5[2]
                ]
            }

            a1.positif = jarak(a1.value, maxCTB);
            a1.negatif = jarak(a1.value, minCTB);
            a1.solusi = solusi(a1.positif, a1.negatif);

            a2.positif = jarak(a2.value, maxCTB);
            a2.negatif = jarak(a2.value, minCTB);
            a2.solusi = solusi(a2.positif, a2.negatif);

            a3.positif = jarak(a3.value, maxCTB);
            a3.negatif = jarak(a3.value, minCTB);
            a3.solusi = solusi(a3.positif, a3.negatif);




            const dataAlternatif = [a1, a2, a3];

            const sortSolusinya = _.sortBy( dataAlternatif, 'solusi' ).reverse();

            this.solusinya.splice(0);
            this.solusinya.push(...sortSolusinya);

            this.isJawaban = true;

        }
    }
})