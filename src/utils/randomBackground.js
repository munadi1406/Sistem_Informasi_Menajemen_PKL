
const bg = ['bg-blue-300', 'bg-red-300', 'bg-indigo-300', 'bg-purple-300','bg-blue-gray-300','bg-green-300',];

export const randomBg = () => {
  const randomNumber = Math.floor(Math.random() * bg.length);
  return bg[randomNumber]; 
};
