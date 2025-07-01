type ParticipantListItemProps = {
    participant: {
        nome: string;
        _id: string;
    };
    onDelete: (id: string) => void;
}

const ParticipantListItem = ({ participant, onDelete }: ParticipantListItemProps) => (
    <li
      className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">
              {participant.nome.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-gray-900 text-xl mb-1">{participant.nome}</h3>
          </div>
        </div>
        <button
          onClick={() => onDelete(participant._id)}
          className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200 group border border-gray-200 hover:border-red-200"
          title="Excluir participante"
        >
          <svg
            className="w-6 h-6 group-hover:scale-110 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </li>
  );

export default ParticipantListItem;