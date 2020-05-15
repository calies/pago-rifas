export abstract class CRUDAbstractService{
	public abstract create(pObject);
	public abstract read(pId);
	public abstract update(pObject);
	public abstract delete(pId);
	public abstract getAll();
	public abstract getActive();
	public abstract getInactive();
	public abstract uploadImage(pFile);
	public abstract getFiltered(pCliente, pAll);
}