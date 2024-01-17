import TextInput from "../../../components/TextInput";
import WithContainerModal from "../../../utils/WithContainerModal";
import PropTypes from "prop-types";
import ButtonCustom from "../../../components/ButtonCustom";
import Header from "../../../components/templateSuratLayout/Header";
import Footer from "../../../components/templateSuratLayout/Footer";
import Loader from "../../../components/Loader";
import { useReactToPrint } from "react-to-print";
import {  useRef } from "react";
import { FaPrint } from "react-icons/fa";

const Print = ({ handleChange, data, initialData, clearFilter }) => {
  const ref = useRef();

  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });
  return (
    <div className="relative flex place-items-center flex-col">
      <div className="grid sm:grid-cols-3 grid-cols-1 gap-2 w-full sticky top-0 bg-white p-2">
        <TextInput
          type={"date"}
          label={"Dari Tanggal"}
          name="startDate"
          onChange={handleChange}
          value={initialData.startDate || ""}
        />
        <TextInput
          type={"date"}
          label={"Sampai Tanggal"}
          name="endDate"
          onChange={handleChange}
          value={initialData.endDate || ""}
        />
        <div>
          <ButtonCustom text={"Clear"} onClick={clearFilter} />
        </div>
      </div>
      {data.isLoading && (
        <div className="flex justify-center p-3">
          {" "}
          <Loader />
        </div>
      )}
      {!data.isLoading && data.isSuccess && initialData.endDate && (
        <>
          <div className="py-3 px-3 text-black space-y-2 mt-5  w-[794px]" ref={ref}>
            <Header />
            <div className="w-full text-center text-xl font-semibold uppercase underline underline-offset-2">
              Laporan Surat Keluar
            </div>
            <p className="w-full text-center text-xs">
              Dari {new Date(initialData.startDate).toLocaleDateString("en-GB")}{" "}
              Sampai {new Date(initialData.endDate).toLocaleDateString("en-GB")}
            </p>
            <table className="border-collapse border border-black w-full">
              <thead>
                <tr>
                  <th className="border border-black py-2 text-[15px]">No</th>
                  <th className="border border-black py-2 text-[15px]">Nomor Surat</th>
                  <th className="border border-black py-2 text-[15px]">Penerima</th>
                  <th className="border border-black py-2 text-[15px]">Perihal</th>
                  <th className="border border-black py-2 text-[15px]">Tanggal Keluar</th>
                </tr>
              </thead>

              <tbody>
                {data.data.pages.map(({ data }) =>
                  data.data.data.map(
                    ({ nomorSurat, penerima, perihal, tanggalKeluar }, i) => (
                      <tr key={i}>
                        <td className={"border border-black text-center p-1 "}>
                          {i + 1}
                        </td>
                        <td className={"border border-black p-1"}>
                          {nomorSurat}
                        </td>
                        <td className={"border border-black p-1"}>
                          {penerima}
                        </td>
                        <td className={"border border-black p-1"}>{perihal}</td>
                        <td className={"border border-black p-1"}>
                          {new Date(tanggalKeluar).toLocaleDateString("en-GB")}
                        </td>
                      </tr>
                    ),
                  ),
                )}
              </tbody>
            </table>
            <div className="py-6">
              <Footer />
            </div>
          </div>
          <div className="p-2 w-full sticky bottom-0 bg-white  ">
            <ButtonCustom
              text={
                <div className="flex gap-2">
                  <FaPrint className="h-4 w-4" /> Cetak
                </div>
              }
              onClick={handlePrint}
              color={"green"}
            />
          </div>
        </>
      )}
    </div>
  );
};

Print.propTypes = {
  handleChange: PropTypes.func,
  data: PropTypes.object,
  initialData: PropTypes.object,
  clearFilter: PropTypes.func,
};
export default WithContainerModal(Print);
