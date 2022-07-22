# Latihan Form Excel

Library untuk membaca file excel menggunakan [read-excel-file](https://www.npmjs.com/package/read-excel-file).

```javascript
import readXlsxFile from "read-excel-file";
```

Secara default, file excel akan dibaca sebagai array of array. Agar formatnya menjadi JSON, maka perlu mendefinisikan schema table yang digunakan ([baca](https://gitlab.com/catamphetamine/read-excel-file#json)).

[/modules/Form/schema.tsx](/modules/Form/schema.tsx)

```javascript
export const schema = {
  Nama: {
    prop: "name",
    type: String,
    required: true,
  },
  "Tanggal Lahir": {
    prop: "birthDate",
    type: String,
    required: true,
  },
  "Tahun Lahir": {
    prop: "birthYear",
    type: Number,
    required: true,
  },
  Hobi: {
    prop: "hobby",
    type: String,
    required: true,
  },
  Alamat: {
    prop: "address",
    type: String,
    required: true,
  },
  Kelas: {
    prop: "class",
    type: String,
    required: true,
  },
  Sekolah: {
    prop: "school",
    type: String,
    required: true,
  },
};
```

Kemudian masukkan schema digunakan.

```javascript
readXlsxFile(event.target.files[0], { schema }).then(({ rows, errors }) => {
  if (errors.length !== 0) {
    console.log(errors);
    return;
  }

  console.log(rows);
});
```
