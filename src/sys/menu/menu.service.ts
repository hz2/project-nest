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
    // private connection: Connection
  ) { }

  async create(newMenu: Menu) {
    try {
      const pid = newMenu.pid
      const manager = getManager();
      const parent = await manager.getTreeRepository(Menu).findOne(pid)
      const m = new Menu();
      if (parent) {
        m.parent = parent
      }
      Object.assign(m, newMenu)
      await manager.save(m);
      // this.menuRepositoryTree.save(qqqq);
    } catch (error) {
      console.log('e', error);
    }
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
  }

  async tree() {
    return await this.menuRepositoryTree.findTrees()

  }

  findOne(id: number) {
    return this.menuRepository.findOne(id);
  }

  async remove(id: number) {
    const item = await this.menuRepository.findOne(id);
    const [_self, children] = await this.menuRepositoryTree.findDescendants(item)
    if (children) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: `请先删除子菜单！`,
      }, HttpStatus.BAD_REQUEST);
    } else {
      this.menuRepository.softDelete(id);
    }
  }
}
