'use client';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Textarea } from '@/shared/components/form-components/textarea';
import { useState } from 'react';
import { toast } from 'sonner';

const InterventionForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'medium',
        status: 'pending'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success('Intervention créée avec succès');
        // Handle form submission here
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Nouvelle Intervention</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="title">Titre</Label>
                    <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Titre de l'intervention"
                        required
                    />
                </div>
                
                <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Description détaillée de l'intervention"
                        rows={4}
                        required
                    />
                </div>

                <div>
                    <Label htmlFor="priority">Priorité</Label>
                    <select
                        id="priority"
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="low">Faible</option>
                        <option value="medium">Moyenne</option>
                        <option value="high">Élevée</option>
                        <option value="urgent">Urgente</option>
                    </select>
                </div>

                <Button type="submit" className="w-full">
                    Créer l'intervention
                </Button>
            </form>
        </div>
    );
};

export default InterventionForm;
