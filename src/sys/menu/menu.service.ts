import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository, TreeRepository } from 'typeorm';
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

  create(createMenuDto: CreateMenuDto) {
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
    return await this.menuRepositoryTree.findTrees()
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
