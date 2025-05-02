export default function Dashboard() {
  return (
    <div className="w-full flex items-center h-full flex-col pt-40">
      <div className="w-1/3 flex h-auto justify-start items-center">
        <div className="w-full flex h-auto flex-col">
          <h1 className="text-4xl font-bold">Portal do aluno</h1>
          <div className="w-full flex items-center">
            <p>Nome:</p>
            <p>Matricula: </p>
          </div>
        </div>
      </div>
    </div>
  );
}
