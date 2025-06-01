import ComingSoon from "@/app/components/ComingSoon";

const Cursos = () => {
  return (
    <div className="pt-10">
      <div className="flex items-center justify-between">
        <h1 className="text-black text-[42px] font-bold">Cursos</h1>
      </div>
      <ComingSoon message="Estamos trabalhando para trazer o controle de cursos em breve!" />
    </div>
  );
};

export default Cursos;
