import PropTypes from 'prop-types'



const Table = ({data}) => {
    const style = {
        header: "cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
      }
  return (
    <table className="mt-4 w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            <th className={`${style.header}`}>Pembuat Sertifikat</th>
            <th className={`${style.header}`}>Penerima Sertifikat</th>
            <th className={`${style.header}`}>Dalam Rangka</th>
            <th className={`${style.header}`}>DiBuat Pada</th>
          </tr>
        </thead>
        <tbody>
          {data.pages.map(({ data }) =>
            data.data.data.map((e, i) => {
              const isLast = i === data.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";
              return (
                <tr key={i}>
                  <td className={classes}>{e.user.username}</td>
                  <td className={classes}>{e.nama}</td>
                  <td className={classes}>{e.dalam_rangka}</td>
                  <td className={classes}>{new Date(e.createdAt).toLocaleString()}</td>
                </tr>
              )
            }
            ))}
        </tbody>
      </table>
  )
}
Table.propTypes={
    data:PropTypes.object
}
export default Table