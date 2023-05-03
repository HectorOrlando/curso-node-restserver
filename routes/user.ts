import { Router } from "express";
import { userGet, userPost, userPut, userDelete, userPatch } from '../controllers/userController';

const router: Router = Router();

router.get('/', userGet);
router.post('/', userPost);
router.put('/:id', userPut);
router.delete('/', userDelete);
router.patch('/', userPatch);

export default router;
