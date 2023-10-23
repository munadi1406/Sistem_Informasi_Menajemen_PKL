import WithContainerModal from "../../../utils/WithContainerModal";
import Index from "../../../components/templateSuratLayout/Index";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const PreviewSurat = ({ handleGetDetailSurat }) => {
  const [isiTemplate, setIsiTemplate] = useState("");

  function replaceVariables(input, variables) {
    // const tipeIsi;
    // const kataYangMengandungIsi = Object.keys(
    //   JSON.parse(handleGetDetailSurat.data.template.variable),
    // ).find((key) => key.includes("isi"));
    // if (kataYangMengandungIsi) {
    //   const isiValue = JSON.parse(handleGetDetailSurat.data.template.variable);

    // }
    let output = input;
    const isiSurat = JSON.parse(handleGetDetailSurat.data.isi_surat);
    // console.log(variables)
   
    variables.forEach((variableName) => {
      if (isiSurat[variableName]) {
        const variableRegex = new RegExp("\\[" + String(variableName) + "\\]", "g");
        // console.log({variableName})
        if (Array.isArray(isiSurat[variableName])) {
            // Dapatkan nama properti dari objek pertama dalam array
            const firstObject = isiSurat[variableName][0];
            const propertyNames = Object.keys(firstObject);
      
            // Buat elemen <thead> dengan nama properti
            const theadContent = propertyNames.map((propertyName) => {
              return `<th class="border border-black capitalize">${propertyName}</th>`;
            }).join('');
      
            // Buat isi tabel dengan baris-baris data
            const tableContent = isiSurat[variableName]
              .map((item) => {
                return `<tr >${Object.values(item)
                  .map((value) => `<td class="border border-black pl-2">${value}</td>`)
                  .join("")}</tr>`;
              })
              .join("");
      
            output = output.replace(
              variableRegex,
              `<table class="border-collapse border border-black w-full"><thead>${theadContent}</thead><tbody>${tableContent}</tbody></table>`,
            );
          } else {
          // Jika bukan array, gantikan dengan nilai langsung
          output = output.replace(variableRegex, isiSurat[variableName]);
        }
      }
    });
    return output;
  }
  useEffect(() => {
    if (!handleGetDetailSurat.isLoading) {
      const templateText = handleGetDetailSurat.data.template.isi_template;

      // Objek yang berisi pengganti untuk setiap kunci
      const { data } = handleGetDetailSurat;
    //   console.log({ iniData: data });
    //   console.log(data.isi_surat);
      const variable = JSON.parse(data.template.variable);
    //   console.log({ iniObject: Object.keys(variable) });
      const convertDate = new Date(data.createdAt).getFullYear();

      const pengganti = {
        "{nomor}": data.id_surat,
        "{date}": convertDate,
        "{perihal}": data.perihal,
        // Tambahkan kunci-pengganti lain yang Anda butuhkan di sini
      };

      // Membuat ekspresi reguler untuk mencari kata-kata dalam kurung kurawal
      const regex = /{[^{}]+}/g;

      // Menggantikan kata-kata yang sesuai dengan pengganti
      const isiTerganti = templateText.replace(regex, function (match) {
        return pengganti[match] || match;
      });

      const variableArray = Object.keys(variable);

      // Replace variables in the input string
      const resultString = replaceVariables(isiTerganti, variableArray);

    //   console.log(resultString);

      setIsiTemplate(resultString);
    }
  }, [handleGetDetailSurat]);

  if (handleGetDetailSurat.isLoading) {
    return <>Loading...</>;
  }

//   console.log({ data: handleGetDetailSurat.data });

  return (
    <>
      <Index isi={isiTemplate} />
    </>
  );
};

PreviewSurat.propTypes = {
  handleGetDetailSurat: PropTypes.object,
};
export default WithContainerModal(PreviewSurat);
