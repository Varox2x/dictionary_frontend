import React from 'react'

type Props = {
};

const Sidebar: React.FC<Props> = () => {
  return (
    <ul style={{position: "absolute", top:0, bottom:0, left: 0}}>
        <li>Zestawy:</li>
        <li>Edytuj zestaw:</li>
        <li>Ustawienia:</li>
    </ul>
  )
}

export default Sidebar