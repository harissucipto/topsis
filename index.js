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


            ///////////////////////////////

            console.log(nRij(this.c1));
        }
    }
})