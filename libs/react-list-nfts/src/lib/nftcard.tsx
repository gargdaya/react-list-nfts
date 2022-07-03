const style = {
  wrapper: `bg-[#303339] flex-auto w-[16rem] h-[25rem] my-10 mx-5 rounded-2xl overflow-hidden cursor-pointer`,
  imgContainer: ` h-2/3 w-full overflow-hidden flex justify-center items-center`,
  nftImg: `w-full object-cover`,
  details: `p-3`,
  info: `flex justify-between text-[#e4e8eb] drop-shadow-xl`,
  infoLeft: `flex-0.6 flex-wrap`,
  collectionName: `font-semibold text-sm text-[#8a939b]`,
  assetName: `font-bold text-lg mt-2`,
  infoRight: ` flex-0.4 text-right`,
  priceTag: `font-semibold text-sm text-[#8a939b]`,
  priceValue: `flex items-center text-xl font-bold mt-2`,
  ethLogo: `h-5 mr-2`,
  likes: `text-[#8a939b] font-bold flex items-center w-full justify-end mt-3`,
  likeIcon: `text-xl mr-2`,
};
const NftCard = ({ nftItem, showAtt = false }: any) => {
  return (
    <div className={style.wrapper}>
      <div className={style.imgContainer}>
        <img src={nftItem.image} alt={nftItem.name} className={style.nftImg} />
      </div>
      <div className={style.details}>
        <div className={style.info}>
          <div className={style.infoLeft}>
            <div className={style.collectionName}>{nftItem.title}</div>
            <div className={style.assetName}>{nftItem.name}</div>
          </div>
          {/* {showAtt &&
		  <div className="flex py-2 mx-2 flex-col">
				{nftItem.attributes.map((el: any) => (
              <div className="text-sm">
                {el.trait_type}:
                {el.value}
              </div>
            ))}
		  </div>
} */}
        </div>
      </div>
    </div>
  );
};

export default NftCard;
