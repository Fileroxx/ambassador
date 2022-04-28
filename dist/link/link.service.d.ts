import { AbstractService } from 'src/shared/abstract.service';
import { Repository } from 'typeorm';
import { Link } from './link';
export declare class LinkService extends AbstractService {
    private readonly linkRepository;
    constructor(linkRepository: Repository<Link>);
}
