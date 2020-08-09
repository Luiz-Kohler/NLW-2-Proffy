import React from "react";

import whastappIcon from "../../assets/images/icons/whatsapp.svg";

import "./styles.css";
import api from "../../services/api";

export interface Teacher{
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name:string;
  subject: string;
  whatsapp: string;
}

interface TeacherItemProps{
  teacher: Teacher;
}

const TeacherItem : React.FC<TeacherItemProps>= ({teacher}) => {

  async function create_new_connection(){
    api.post('connections', {
      user_id: teacher.id
    })
    console.log('connection created')
  }

  return (
    <article className="teacher-item">
      <header>
        <img
          src={teacher.avatar}
          alt="Foto do professor"
        />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>{teacher.bio}</p>

      <footer>
        <p>
          Preço por hora
          <strong>R$ {teacher.cost}</strong>
        </p>
        <a target="_blank" onClick={create_new_connection} href={`https://wa.me/${teacher.whatsapp}?text=Oi%20tenho%20interesse%20na%20sua%20sua%20aula`}>
          <img src={whastappIcon} alt={teacher.whatsapp} />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;