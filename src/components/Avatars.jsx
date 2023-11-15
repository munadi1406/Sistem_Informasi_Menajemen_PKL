import Avatar from "boring-avatars";

export default function Avatars() {
  const names = [
    "Mary Baker",
    "Amelia Earhart",
    "Amelia Earhart",
    "Sarah Winnemucca",
    "Margaret Brent",
    "Lucy Stone",
    "Mary Edwards",
    "Margaret Chase",
    "Mahalia Jackson",
    "Maya Angelou",
    "Grace Hopper",
    "Hetty Green",
    "Biddy Mason",
    "Emma Lazarus",
    "Ellen Swallow",
    "Pauli Murray",
    "Susan B",
    "Annie Dodge",
    "Phillis Wheatley",
    "Rosa Parks",
    "Jovita Idár",
    "Henrietta Swan",
    "Christa McAuliffe",
  ];

  const getRandomName = () => {
    const randomNumber = Math.floor(Math.random() * names.length);
    return names[randomNumber];
  };

  return (
    <Avatar
      size={40}
      name={`${getRandomName()}`}
      variant="beam"
      colors={["#f26b7a", "#f0f2dc", "#d9eb52", "#8ac7de", "#87796f"]}
    />
  );
}
