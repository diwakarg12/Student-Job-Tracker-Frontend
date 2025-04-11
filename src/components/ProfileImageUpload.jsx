
const ProfileImageUpload = ({handleImageChange, image}) => {

  return (
    <div className="flex w-24 h-24 sm:h-44 sm:w-44 flex-col justify-center items-center mb-2">
      <div className="relative sm:w-44 sm:h-44">
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange} 
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full rounded-full" 
        />
        
        <div className="w-24 h-24 sm:h-44 sm:w-44 rounded-full overflow-hidden border-4 border-gray-300">
          {image ? (
            <img 
              src={image} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-white font-bold">
              Upload
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileImageUpload;
