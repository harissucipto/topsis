let app = new Vue({
  el: '#app',
  data: {
    namaAlternatif: ['hp-1', 'hp-2', 'hp-3', 'hp-4'],
    c1: [3500, 4500, 4000, 4000],
    c2: [70, 90, 80, 70],
    c3: [10, 10, 9, 8],
    c4: [80, 60, 90, 50],
    c5: [3000, 2500, 2000, 1500],
    c6: [36, 48, 48, 60],
    bobotCN: [5, 5, 4, 3, 3, 4],
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
      const powC = C => i => math.pow(C[i], 2);

      // mencari nilai xi
      const Xi = C => {
        const powCi = powC(C);
        return math.round(math.sqrt(powCi(0) + powCi(1) + powCi(2)), 4);
      };

      // mencari rij
      const Rij = vx => vc => math.round(vc / vx, 4);

      // normalisasi
      const nRij = arr => {
        const vx = Xi(arr);
        const cariRij = Rij(vx);
        return arr.map(value => cariRij(value));
      };

      // F. kalikan dengan bobot
      const valXb = (val, i) => val * this.bobotCN[i];

      // c kali dengan bobot index
      const cXb = (arr, i) => arr.map(value => valXb(value, i));

      // minum dari array
      const minArr = arr => math.min(...arr);

      // maksimum dari array
      const maxArr = arr => math.max(...arr);

      // F. Jarak
      const jarak = (nilaiTerbobot, solusi) => {
        const dikurangi = nilaiTerbobot.map((nilai, i) => {
          return nilai - solusi[i];
        });
        const dipow2 = dikurangi.map(nilai => math.pow(nilai, 2));

        const dijumlahkan = dipow2.reduce((a, b) => a + b, 0);

        return math.round(math.sqrt(dijumlahkan), 4);
      };

      // F.solusi
      const solusi = (positif, negatif) => {
        return math.round(negatif / (positif + negatif), 4);
      };

      ////////////////////////////////////////////////////<<<<<<<
      //////////////////////////cari jawabanya\\\\\\\\\\\\\\\\\\\\\
      ////////////////////////////////////////////////////////////

      /////////////////////////////// cari matriks normalisasi
      const cT1 = nRij(this.c1);
      const cT2 = nRij(this.c2);
      const cT3 = nRij(this.c3);
      const cT4 = nRij(this.c4);
      const cT5 = nRij(this.c5);
      const cT6 = nRij(this.c6);

      /// Matriks keputusan ternormalisasi terbobot
      const cTB1 = cXb(cT1, 0);
      const cTB2 = cXb(cT2, 1);
      const cTB3 = cXb(cT3, 2);
      const cTB4 = cXb(cT4, 3);
      const cTB5 = cXb(cT5, 4);
      const cTB6 = cXb(cT6, 5);

      // solusi ideal positif
      const maxCTB2 = maxArr(cTB2);
      const maxCTB3 = maxArr(cTB3);
      const maxCTB4 = maxArr(cTB4);
      const maxCTB5 = maxArr(cTB5);
      const maxCTB6 = maxArr(cTB6);

      const maxCTB = [maxCTB2, maxCTB3, maxCTB4, maxCTB5, maxCTB6];

      // solusi ideal negatif
      const minCTB1 = minArr(cTB1);

      const minCTB = [minCTB1];

      // masukan bobot niali CTB  ke tiap nama alternatif

      const a1 = {
        name: this.namaAlternatif[0],
        valuePositf: [cTB2[0], cTB3[0], cTB4[0], cTB5[0], cTB6[0]],
        valueNegatif: [cTB1[0]]
      };

      const a2 = {
        name: this.namaAlternatif[1],
        valuePositf: [cTB2[1], cTB3[1], cTB4[1], cTB5[1], cTB6[1]],
        valueNegatif: [cTB1[1]]
      };

      const a3 = {
        name: this.namaAlternatif[2],
        valuePositf: [cTB2[2], cTB3[2], cTB4[2], cTB5[2], cTB6[2]],
        valueNegatif: [cTB1[2]]
      };

      const a4 = {
        name: this.namaAlternatif[3],
        valuePositf: [cTB2[3], cTB3[3], cTB4[3], cTB5[3], cTB6[3]],
        valueNegatif: [cTB1[3]]
      };

      a1.positif = jarak(a1.valuePositf, maxCTB);
      a1.negatif = jarak(a1.valueNegatif, minCTB);
      console.log(jarak(a1.valueNegatif, minCTB));
      a1.solusi = solusi(a1.positif, a1.negatif);

      a2.positif = jarak(a2.valuePositf, maxCTB);
      a2.negatif = jarak(a2.valueNegatif, minCTB);
      a2.solusi = solusi(a2.positif, a2.negatif);

      a3.positif = jarak(a3.valuePositf, maxCTB);
      a3.negatif = jarak(a3.valueNegatif, minCTB);
      a3.solusi = solusi(a3.positif, a3.negatif);

      a4.positif = jarak(a4.valuePositf, maxCTB);
      a4.negatif = jarak(a4.valueNegatif, minCTB);
      a4.solusi = solusi(a4.positif, a4.negatif);

      const dataAlternatif = [a1, a2, a3, a4];

      const sortSolusinya = dataAlternatif.sort(
        (a, b) => (a.solusi > b.solusi ? 1 : a.solusi < b.solusi ? -1 : 0)
      );

      this.solusinya.splice(0);
      this.solusinya.push(...sortSolusinya);

      console.log(a1.positif);
      console.log(a1.negatif);

      this.isJawaban = true;
    }
  }
});
