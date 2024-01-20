import { Helmet as Helmets } from "react-helmet-async"
import Logo from '../assets/logosma1.png'
import PropTypes from 'prop-types'

export default function Helmet({title}) {
    return (
        <Helmets>
            <title>{title}</title>
            <meta name="description" content={`${title} || Sistem Informasi Administrasi SMAN 1 Karang Intan adalah solusi modern untuk mengelola berbagai aspek administratif di sekolah, mencakup pengelolaan data siswa, jadwal pelajaran, kehadiran, dan informasi penting lainnya. Temukan informasi terkini dan akurat seputar administrasi sekolah di SMAN 1 Karang Intan di halaman ini.`} />
            <meta name="keywords" content={`${title} , sistem informasi, administrasi, SMAN 1 Karang Intan, sekolah, pendidikan, pengelolaan data siswa, jadwal pelajaran, kehadiran siswa`} />
            <link rel="canonical" href="https://www.dreamice.my.id" />
            {/* Tag Open Graph untuk platform sosial */}
            <meta property="og:title" content="SISTEM INFORMASI ADMINISTRASI SMAN 1 KARANG INTAN" />
            <meta property="og:description" content="Sistem Informasi Administrasi SMAN 1 Karang Intan adalah solusi modern untuk mengelola berbagai aspek administratif di sekolah, mencakup pengelolaan data siswa, jadwal pelajaran, kehadiran, dan informasi penting lainnya. Temukan informasi terkini dan akurat seputar administrasi sekolah di SMAN 1 Karang Intan di halaman ini." />
            <meta property="og:url" content="https://www.dreamice.my.id" />
            <meta property="og:image" content={Logo} />
            <link rel="icon" type="image/png" href={Logo} />
        </Helmets>
    )
}

Helmet.propTypes={
    title:PropTypes.string.isRequired,
}
