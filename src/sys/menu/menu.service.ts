import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, getManager, Repository, TreeRepository } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';

type MenuWithChild = Menu & {
  children?: MenuWithChild[]
}
@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
    @InjectRepository(Menu)
    private menuRepositoryTree: TreeRepository<Menu>,
    private connection: Connection
  ) { }

  async create(createMenuDto: CreateMenuDto) {
    try {

      const manager = getManager();

      const a1 = new Menu()
      a1.parentId = 1,
        a1.text = "a1";
      await manager.save(a1);

      const a11 = new Menu();
      a11.text = "a11";
      a11.parent = a1;
      await manager.save(a11);

      const a12 = new Menu();
      a12.text = "a12";
      a12.parent = a1;
      await manager.save(a12);

      const a111 = new Menu();
      a111.text = "a111";
      a111.parent = a11;
      await manager.save(a111);

      const a112 = new Menu();
      a112.text = "a112";
      a112.parent = a11;
      await manager.save(a112);
    } catch (error) {

      console.log('e', error);


    }


    return
    if (!createMenuDto.path) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: `必填`,
      }, HttpStatus.BAD_REQUEST);
    }
    this.menuRepository.save(Object.assign({
      parentId: 1,
    }, {
      ...createMenuDto
    }));
  }

  async findAll() {
    const r = await this.menuRepository.find();
    return r
  }

  async findAllTree() {
    try {
      const manager = getManager();
      const trees = await manager.getTreeRepository(Menu).findTrees();
      return trees
    } catch (error) {
      console.log('e', error);
    }

    //   const menuAll: MenuWithChild[] = await this.menuRepository.find();
    //   const menuChildrenList = [... new Set(menuAll.map((x: Menu) => x.parentId))]
    //   menuAll.forEach(x => { menuChildrenList.includes(x.id) ? x.children = menuAll.filter(y => y.parentId === x.id) : void 0 })
    //   return menuAll.filter(x=>x.parentId===0)
  }

  async tree() {
    return await this.menuRepositoryTree.findTrees()
  }

  findOne(id: number) {
    return this.menuRepository.findOne(id);
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu`;
  }

  remove(id: number) {
    this.menuRepository.softDelete(id);
  }
}
